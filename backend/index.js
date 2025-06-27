import cors from "cors"
import express from "express"
import sequelize from "./models/db.js";
import dotenv from 'dotenv';
import path from "path"
import Usuario from './models/Usuario.js';
import Producto from './models/Producto.js';
import Carrito from './models/Carrito.js';
import DetalleCarrito from './models/DetalleCarrito.js';

import productosRoutes from "./routes/productos.js"
import usuariosRoutes from "./routes/usuarios.js"
import carritosRoutes from "./routes/carritos.js"
import authRoutes from "./routes/auth.js"
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/productos", productosRoutes)
app.use("/api/usuarios", usuariosRoutes)
app.use("/api/carritos", carritosRoutes)
app.use("/api/auth", authRoutes)
app.use('/uploads', express.static(path.resolve('uploads')));
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.listen(PORT, async() => {
    try {
        await sequelize.authenticate()
        console.log("Conexion a la base de datos exitosa");
        await sequelize.sync({alter: true})
        console.log("Modelo sincronizado con la base de datos");
        
        
    } catch (error) {
        console.error("Error en la conexion con la base de datos", error)
    }

    console.log(`Servidor corriendo en el puert ${PORT}`);
    
});