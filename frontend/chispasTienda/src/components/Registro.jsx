import { useState } from "react";
import axios from "axios";
import "../App.css";

export default function Registro({ onVolverAInicio, onIrALogin }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const registrar = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const { data } = await axios.post("http://localhost:3001/api/usuarios", {
        nombre,
        email,
        password,
      });

      setMensaje(data.mensaje);
    } catch (error) {
      if (error.response?.data?.error) {
        setMensaje(error.response.data.error);
      } else {
        setMensaje("Error al registrar");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Registro</h2>
      <form onSubmit={registrar}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
      </form>

      {mensaje && <p className="info">{mensaje}</p>}

      <p>
        ¿Ya tenés cuenta?{" "}
        <button onClick={onIrALogin}>Iniciar sesión</button>
      </p>
      <p>
        <button onClick={onVolverAInicio}>Volver a la tienda</button>
      </p>
    </div>
  );
}