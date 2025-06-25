import { useState, useEffect } from 'react';
import ProductoCard from './ProductoCard.jsx';
import axios from "../utils/axiosConfig";
function Productos({ categoria }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const params = {};
        if (categoria && categoria !== 'todo') {
          params.categoria = categoria;
        }
        const { data } = await axios.get('http://localhost:3001/api/productos', { params });
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos', error);
      }
    };

    cargarProductos();
  }, [categoria]);

  return (
    <div className="contenedor-productos">
      {productos.map(p => <ProductoCard key={p.id} producto={p} />)}
    </div>
  );
}

export default Productos;