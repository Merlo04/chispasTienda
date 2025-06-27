import { useState, useEffect } from "react";
import ProductoCard from "./ProductoCard.jsx";
import axios from "../utils/axiosConfig";

function Productos({ categoria, busqueda, user }) {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    try {
      const params = {};
      if (categoria && categoria !== "todo") {
        params.categoria = categoria;
      }
      if (busqueda) {
        params.search = busqueda;
      }
      const { data } = await axios.get("/productos", { params });
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar productos", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, [categoria, busqueda]);

  return (
    <div className="contenedor-productos">
      {productos.map((p) => (
        <ProductoCard
          key={p.id}
          producto={p}
          user={user}
          onProductoEliminado={cargarProductos}
        />
      ))}
    </div>
  );
}

export default Productos;
