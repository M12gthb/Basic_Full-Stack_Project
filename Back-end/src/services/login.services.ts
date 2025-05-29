import { compare } from "bcryptjs";
import { sign, SignOptions } from "jsonwebtoken";
import { User } from "../entities";
import { AppError } from "../error/App.error";
import { usersRepository } from "../repositories";
import { loginCreate, loginReturn } from "../interfaces/login.interfaces";

const loginServices = async ({
  email,
  password,
}: loginCreate): Promise<loginReturn> => {
  // Verificação segura das variáveis de ambiente
  const secretKey = process.env.SECRET_KEY;
  const expiresIn = Number(process.env.EXPIRES_IN);

  if (!secretKey) {
    throw new AppError("JWT secret key not configured", 500);
  }

  if (!expiresIn) {
    throw new AppError("Token expiration not configured", 500);
  }

  // Validação de entrada
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  // Busca o usuário
  const foundUser = await usersRepository.findOneBy({ email });
  if (!foundUser) {
    throw new AppError("Invalid credentials", 401);
  }

  // Verificação de senha
  const samePwd = await compare(password, foundUser.password);
  if (!samePwd) {
    throw new AppError("Invalid credentials", 401);
  }

  // Configuração explícita das opções do token
  const tokenOptions: SignOptions = {
    expiresIn,
    subject: foundUser.id.toString(),
    algorithm: "HS256", // Algoritmo explícito
  };

  // Criação do token com tipagem segura
  const token = sign(
    {
      id: foundUser.id,
      email: foundUser.email,
    },
    secretKey,
    tokenOptions
  );

  return {
    token,
  };
};

export { loginServices };
