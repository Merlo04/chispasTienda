import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

export default function RegistroModal({ show, handleClose, onSwitchToLogin }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const registrar = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      const { data } = await axios.post('http://localhost:3001/api/usuarios', {
        nombre,
        email,
        password
      });
      setMensaje(data.mensaje || 'Registrado con éxito');
    } catch (error) {
      setMensaje(error.response?.data?.error || 'Error al registrar');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={registrar}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          {mensaje && <Alert variant="info">{mensaje}</Alert>}
          <Button variant="success" type="submit" className="w-100">Registrarse</Button>
        </Form>
        <div className="text-center mt-3">
          <span>¿Ya tenés cuenta? <Button variant="link" onClick={onSwitchToLogin}>Iniciar sesión</Button></span>
        </div>
      </Modal.Body>
    </Modal>
  );
}