import { useState } from "react";
import ModalDesc from "./ModalDesc";
import { useCarrito } from "../components/CarritoContext.jsx";
import axios from "../utils/axiosConfig.js";
import EditarProductoModal from "./EditarProductoModal.jsx";

function formatearPrecio(precio) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(precio);
}

function ProductoCard({ producto, user, onProductoEliminado }) {
  const [show, setShow] = useState(false);
  const { agregarProducto } = useCarrito();
  const [showEditar, setShowEditar] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleProductoActualizado = () => {
    setShowEditar(false);
    onProductoEliminado(); // recarga los productos
  };

  const eliminarProducto = async () => {
    if (confirm("¿Estás seguro que querés eliminar este producto?")) {
      try {
        await axios.delete(`/productos/${producto.id}`);
        onProductoEliminado(); // Refresca la lista
      } catch (error) {
        console.error("Error al eliminar producto", error);
        alert("No se pudo eliminar el producto");
      }
    }
  };

  return (
    <>
      <div className="card-producto">
        <img src={producto.imagen_url} className="img-producto" alt={producto.nombre} />
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <div className="precio">{formatearPrecio(producto.precio)}</div>

        <div className="acciones-card">
          <button className="btn-agregar" onClick={() => agregarProducto(producto)}>
            Agregar al carrito
          </button>
          <button className="btn-ver-mas" onClick={handleShow}>
            Ver más
          </button>

          {user?.rol === "admin" && (
            <>
              <button className="btn-editar" onClick={() => setShowEditar(true)}>
                ✏️ Editar
              </button>
              <button className="btn-eliminar" onClick={eliminarProducto}>
                🗑️ Eliminar
              </button>
            </>
          )}
        </div>
      </div>

      {showEditar && (
        <EditarProductoModal
          show={showEditar}
          handleClose={() => setShowEditar(false)}
          producto={producto}
          onProductoActualizado={handleProductoActualizado}
        />
      )}

      <ModalDesc show={show} handleClose={handleClose} producto={producto} />
    </>
  );
}

export default ProductoCard;