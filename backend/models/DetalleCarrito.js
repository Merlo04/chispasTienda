import { DataTypes } from 'sequelize';
import sequelize from './db.js';
import Carrito from './Carrito.js';
import Producto from './Producto.js';

const DetalleCarrito = sequelize.define('DetalleCarrito', {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  timestamps: true,
});

DetalleCarrito.belongsTo(Carrito);
DetalleCarrito.belongsTo(Producto);

export default DetalleCarrito;