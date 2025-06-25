import express from 'express';
import Usuario from '../models/Usuario.js';

const router = express.Router();

// GET /api/usuarios → obtener usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// POST /api/usuarios → crear usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const usuario = await Usuario.create({ nombre, email, password });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

export default router;