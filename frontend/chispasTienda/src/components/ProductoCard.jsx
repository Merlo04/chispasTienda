function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(precio);
}

function ProductoCard({ producto }) {
  return (
    <div className="card-producto">
      <img src={producto.imagen_url} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <div className="precio">{formatearPrecio(producto.precio)}</div>
      <button>Agregar al carrito</button>
    </div>
  );
}

export default ProductoCard;
