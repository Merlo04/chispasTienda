import { useState } from "react";
import axios from "axios";
import "../App.css";

export default function Login({ onLogin, onVolverAInicio, onIrARegistro }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const { data } = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });

      onLogin(data.token);
    } catch (error) {
      if (error.response?.data?.mensaje) {
        setMensaje(error.response.data.mensaje);
      } else {
        setMensaje("Error al intentar iniciar sesión");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={iniciarSesion}>
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
        <button type="submit">Ingresar</button>
      </form>

      {mensaje && <p className="error">{mensaje}</p>}

      <p>
        ¿No tenés cuenta?{" "}
        <button onClick={onIrARegistro}>Registrate</button>
      </p>
      <p>
        <button onClick={onVolverAInicio}>Volver a la tienda</button>
      </p>
    </div>
  );
}