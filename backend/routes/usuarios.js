import express from 'express';
import Usuario from '../models/Usuario.js';
import { enviarCorreoVerificacion } from '../utils/email.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Crear usuario con verificación
router.post('/', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si ya existe
    const existente = await Usuario.findOne({ where: { email } });
    if (existente) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const hashed = await bcrypt.hash(password, 10);

    // Generar token de verificación random
    const tokenVerificacion = crypto.randomBytes(32).toString('hex');

    // Crear usuario con verificado = false por defecto
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: hashed,
      verificado: false,
      tokenVerificacion,
    });

    // Enviar correo con enlace: http://localhost:5173/verificar?token=...
    await enviarCorreoVerificacion(email, tokenVerificacion);

    res.json({ mensaje: 'Usuario registrado. Revisa tu email para verificar la cuenta.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Verificar cuenta con token en query param
router.get('/verificar', async (req, res) => {
  const token = req.query.token;

  if (!token) return res.status(400).send('Token no proporcionado');

  try {
    const usuario = await Usuario.findOne({ where: { tokenVerificacion: token } });

    if (!usuario) return res.status(404).send('Token inválido o expirado');

    usuario.verificado = true;
    usuario.tokenVerificacion = null;
    await usuario.save();

    return res.status(200).send('Cuenta verificada correctamente');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al verificar cuenta');
  }
});

export default router;