import { useCarrito } from "../components/CarritoContext.jsx";
import "../App.css";

function Carrito({ onClose }) {
  const { carrito, quitarProducto, vaciarCarrito } = useCarrito();

  const total = carrito.reduce(
    (acc, prod) => acc + prod.precio * prod.cantidad,
    0
  );

  return (
    <div className="carrito-modal">
      <div className="carrito-header">
        <h2>🛒 Tu carrito</h2>
        <button className="cerrar" onClick={onClose}>✖</button>
      </div>

      {carrito.length === 0 ? (
        <p className="vacio">Tu carrito está vacío</p>
      ) : (
        <>
          <ul className="carrito-lista">
            {carrito.map((prod) => (
              <li key={prod.id} className="carrito-item">
                <img src={prod.imagen_url} alt={prod.nombre} />
                <div className="detalle">
                  <h4>{prod.nombre}</h4>
                  <p>Cantidad: {prod.cantidad}</p>
                  <p>Precio: ${prod.precio.toLocaleString()}</p>
                </div>
                <button onClick={() => quitarProducto(prod.id)}>
                  🗑️
                </button>
              </li>
            ))}
          </ul>

          <div className="carrito-footer">
            <strong>Total: ${total.toLocaleString()}</strong>
            <div className="acciones">
              <button onClick={vaciarCarrito}>Vaciar</button>
              <button onClick={() => alert("Finalizar compra (pendiente)")}>Finalizar compra</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;