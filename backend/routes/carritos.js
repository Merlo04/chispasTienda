import express from 'express';
import Carrito from '../models/Carrito.js';
import DetalleCarrito from '../models/DetalleCarrito.js';
import Producto from '../models/Producto.js';

const router = express.Router();

// GET /api/carritos → obtener carritos
router.get('/', async (req, res) => {
  try {
    const carritos = await Carrito.findAll({ include: DetalleCarrito });
    res.json(carritos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener carritos' });
  }
});

// POST /api/carritos → crear carrito vacío
router.post('/', async (req, res) => {
  try {
    const { usuarioId } = req.body;
    const carrito = await Carrito.create({ UsuarioId: usuarioId });
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear carrito' });
  }
});

// POST /api/carritos/:id/productos → agregar producto al carrito
router.post('/:id/productos', async (req, res) => {
  try {
    const carritoId = req.params.id;
    const { productoId, cantidad } = req.body;

    const producto = await Producto.findByPk(productoId);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const detalle = await DetalleCarrito.create({
      CarritoId: carritoId,
      ProductoId: productoId,
      cantidad,
      precio_unitario: producto.precio,
    });

    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

export default router;