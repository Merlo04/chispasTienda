import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const Producto = sequelize.define('Producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  imagen_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
    categoria: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "General"
  }
}, {
  timestamps: true,
});

export default Producto;