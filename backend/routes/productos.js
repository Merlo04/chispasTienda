// src/routes/productos.js
import multer from "multer";
import express from 'express';
import { Op } from 'sequelize';
import path from "path";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import Producto from '../models/Producto.js';
import { verificarToken, soloAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

// Configuración de almacenamiento con multer + Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'chispas_tienda',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

// Obtener todos los productos o filtrar por categoría
router.get('/', async (req, res) => {
  const { categoria } = req.query;
  try {
    const productos = await Producto.findAll({
      where: categoria && categoria !== 'todo' ? { categoria: { [Op.like]: `%${categoria}%` } } : {}
    });
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Buscar producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto por ID' });
  }
});

// Crear producto (solo admin con imagen en Cloudinary)
router.post('/', verificarToken, soloAdmin, upload.single("imagen"), async (req, res) => {
  const { nombre, descripcion, precio, stock, categoria } = req.body;

  try {
    const imagen_url = req.file?.path || null;

    const nuevo = await Producto.create({
      nombre,
      descripcion,
      precio,
      stock,
      categoria,
      imagen_url,
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    res.status(500).json({ mensaje: 'Error al crear producto', error });
  }
});

// Actualizar producto
router.put('/:id', verificarToken, soloAdmin, async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    const actualizado = await producto.update(req.body);
    res.json(actualizado);
  } catch (error) {
    console.error("❌ Error al actualizar:", error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Eliminar producto
router.delete('/:id', verificarToken, soloAdmin, async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    await producto.destroy();
    res.json({ mensaje: 'Producto eliminado', producto });
  } catch (error) {
    console.error("Error al eliminar el producto", error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

export default router;