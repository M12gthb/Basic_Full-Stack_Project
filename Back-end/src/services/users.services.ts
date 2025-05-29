import {
  UserCreate,
  UserRead,
  UserReturn,
  UserUpdate,
} from "../interfaces/users.interfaces";
import { User } from "../entities";
import { usersRepository } from "../repositories";
import { userReadSchema, userReturnSchema } from "../schemas/users.schema";

const userCreateService = async (payload: UserCreate): Promise<UserReturn> => {
  const user: User = usersRepository.create(payload);
  await usersRepository.save(user);

  return userReturnSchema.parse(user);
};

const userReadService = async (): Promise<UserRead> => {
  return userReadSchema.parse(await usersRepository.find());
};

const userReadbyIdService = async (id: string): Promise<UserReturn> => {
  const user = await usersRepository.findOne({ where: { id: id } });

  return userReturnSchema.parse(user);
};

const updateUserService = async (
  user: User,
  data: UserUpdate
): Promise<UserReturn> => {
  const userUpdate = await usersRepository.save({ ...user, ...data });

  return userReturnSchema.parse(userUpdate);
};

const userDeleteService = async (user: User): Promise<void> => {
  await usersRepository.softRemove(user);
};

export {
  userCreateService,
  userReadService,
  userDeleteService,
  updateUserService,
  userReadbyIdService,
};
