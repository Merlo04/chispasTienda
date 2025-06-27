import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

export default function LoginModal({ show, handleClose, onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      const { data } = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password
      });
      onLogin(data.token);
      handleClose(); // cerrar modal si inicia bien
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || 'Error al iniciar sesión');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={iniciarSesion}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          {mensaje && <Alert variant="danger">{mensaje}</Alert>}
          <Button variant="primary" type="submit" className="w-100">Ingresar</Button>
        </Form>
        <div className="text-center mt-3">
          <span>¿No tenés cuenta? <Button variant="link" onClick={onSwitchToRegister}>Registrate</Button></span>
        </div>
      </Modal.Body>
    </Modal>
  );
}