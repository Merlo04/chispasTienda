import express from 'express';
import { Op } from 'sequelize';
import Producto from '../models/Producto.js';

const router = express.Router();

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

// Crear producto
router.post('/', async (req, res) => {
  try {
    const nuevo = await Producto.create(req.body);
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

export default router;