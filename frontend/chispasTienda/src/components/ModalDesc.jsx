import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useCarrito } from './CarritoContext'; // ⬅️ Importá el contexto

function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(precio);
}

function ModalDesc({ show, handleClose, producto }) {
  const { agregarProducto } = useCarrito(); // ⬅️ Usá la función

  if (!producto) return null;

  const handleAgregar = () => {
    agregarProducto(producto);
    handleClose(); // opcional: cerrar modal
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{producto.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={producto.imagen_url}
          alt={producto.nombre}
          style={{ width: "100%", marginBottom: "1rem", borderRadius: "8px" }}
        />
        <p><strong>Descripción:</strong> {producto.descripcion}</p>
        <p><strong>Categoría:</strong> {producto.categoria}</p>
        <p><strong>Precio:</strong> {formatearPrecio(producto.precio)}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleAgregar}>
          Agregar al carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDesc;