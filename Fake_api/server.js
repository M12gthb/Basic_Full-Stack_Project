const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const DB_PATH = path.join(__dirname, 'db.json');
const JWT_SECRET = 'your_jwt_secret_key_here';
const JWT_EXPIRES_IN = '1h';

console.log(DB_PATH)

// Helper functions
const readDB = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return { users: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

// Middleware para autenticação JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  
  // Simples validação - em produção usar hash de senha!
  const user = db.users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  
  const token = jwt.sign({ 
    email: user.email, 
    userId: user.id 
  }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  
  res.status(201).json({ token, id: user.id });
});

// CRUD endpoints
app.post('/users', (req, res) => {
  const { name, email, password, image } = req.body;
  const db = readDB();
  
  if (!name || !email || !password || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  if (db.users.some(u => u.email === email)) {
    return res.status(409).json({ error: 'Email already exists' });
  }
  
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password, // Em produção, nunca armazenar senha em texto puro!
    image,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null
  };
  
  db.users.push(newUser);
  writeDB(db);
  
  // Não retornar a senha na resposta
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

app.get('/users', (req, res) => {
  const db = readDB();
  // Filtrar usuários não deletados e remover senhas
  const users = db.users
    .filter(u => u.deletedAt === null)
    .map(({ password, ...user }) => user);
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id === req.params.id && u.deletedAt === null);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Não retornar a senha
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

app.patch('/users/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const db = readDB();
  
  const userIndex = db.users.findIndex(u => u.id === id && u.deletedAt === null);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Verificar se o usuário autenticado está atualizando seu próprio perfil
  if (req.user.userId !== id) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }
  
  // Atualizar campos permitidos
  const allowedUpdates = ['name', 'email', 'image', 'password'];
  const updatedUser = { ...db.users[userIndex] };
  
  Object.keys(updates).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updatedUser[key] = updates[key];
    }
  });
  
  updatedUser.updatedAt = new Date().toISOString();
  db.users[userIndex] = updatedUser;
  writeDB(db);
  
  // Não retornar a senha
  const { password, ...userWithoutPassword } = updatedUser;
  res.json(userWithoutPassword);
});

app.delete('/users/:id', authenticateJWT, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  
  const userIndex = db.users.findIndex(u => u.id === id && u.deletedAt === null);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Verificar se o usuário autenticado está deletando seu próprio perfil
  if (req.user.userId !== id) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }
  
  // Soft delete
  db.users[userIndex].deletedAt = new Date().toISOString();
  writeDB(db);
  
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});