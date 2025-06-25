import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'cliente' // puede ser 'admin' o 'cliente'
  }
}, {
  timestamps: true,
});

export default Usuario;
