import { useState } from "react";
import axios from "axios";
import "../App.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });

      onLogin(data.token);
    } catch (error) {
      alert("Credenciales inválidas");
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
    </div>
  );
}