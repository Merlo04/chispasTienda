import express from 'express';
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ mensaje: 'Email ya registrado' });

    const hashed = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({
      nombre,
      email,
      password: hashed,
      rol: rol || 'cliente',
    });

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el registro', error });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign(
      {
        id: usuario.id,
        rol: usuario.rol,
        nombre: usuario.nombre,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el login', error });
  }
});

export default router;