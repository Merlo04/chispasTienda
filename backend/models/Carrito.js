import { DataTypes } from 'sequelize';
import sequelize from './db.js';
import Usuario from './Usuario.js';

const Carrito = sequelize.define('Carrito', {
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'activo',
  },
}, {
  timestamps: true,
});

Carrito.belongsTo(Usuario);  // FK usuarioId

export default Carrito;