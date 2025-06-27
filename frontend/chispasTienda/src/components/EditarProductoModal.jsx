import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../utils/axiosConfig";

function EditarProductoModal({ show, handleClose, producto, onProductoActualizado }) {
  const [form, setForm] = useState({ ...producto });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.put(`/productos/${producto.id}`, form);
      onProductoActualizado(data);
      handleClose();
    } catch (error) {
      console.error("Error al editar producto", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="nombre" value={form.nombre} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control name="descripcion" value={form.descripcion} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Categoría</Form.Label>
            <Form.Select name="categoria" value={form.categoria} onChange={handleChange}>
              <option value="cartucheras">Cartucheras</option>
              <option value="neceseres">Neceseres</option>
              <option value="portaMaples">Porta Maples</option>
              <option value="totebags">Totebags</option>
              <option value="accesorios">Accesorios</option>
              <option value="bolsos">Bolsos</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control name="precio" value={form.precio} onChange={handleChange} type="number" step="0.01" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Stock</Form.Label>
            <Form.Control name="stock" value={form.stock} onChange={handleChange} type="number" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Imagen URL</Form.Label>
            <Form.Control name="imagen_url" value={form.imagen_url} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditarProductoModal;
