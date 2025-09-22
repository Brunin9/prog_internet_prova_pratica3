import express from 'express';
import {
  getAllDados,
  getDadoById,
  createDado,
  updateDado,
  deleteDado,
  login,
} from '../controllers/controller.js';

import { authenticateToken } from '../middleware/auth.middleware.js';


const router = express.Router();

// Aplicar autenticação em todas as rotas
router.use(authenticateToken);

router.post('/login', login);


// GET - Listar todos os users
router.get('/users', (req, res) => {
  const users = getAllDados();
  res.json(users);
});
router.get('/:id', getDadoById);


// POST - Adicionar um novo user
router.post('/register', (req, res) => {
  const { nome, email, senha } = req.body;
  
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  
  const novouser = createDado({ nome, email, senha });
  res.status(201).json(novouser);
});


// GET - Obter um user específico por ID
router.get('/users/:id', (req, res) => {
  const user = getuserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'user não encontrado' });
  }
});


// PUT - Atualizar um user existente
router.put('/users/:id', (req, res) => {
  const { nome, email, senha } = req.body;
  
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  
  const userAtualizado = updateDado(req.params.id, { nome, email, senha});
  
  if (userAtualizado) {
    res.json(userAtualizado);
  } else {
    res.status(404).json({ error: 'user não encontrado' });
  }
});

// DELETE - Remover um User
router.delete('/users/:id', (req, res) => {
  const sucesso = deleteDado(req.params.id);
  
  if (sucesso) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'User não encontrado' });
  }
});

export { router };
