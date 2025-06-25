import { useState } from "react";
import axios from "axios";

export default function Registro({ onRegisterSuccess, onClose }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await axios.post("http://localhost:3001/api/usuarios", {
        nombre,
        email,
        password,
        rol: "cliente", // Al registrarse siempre será cliente por defecto
      });
      alert("Registro exitoso. Ya podés iniciar sesión.");
      onRegisterSuccess();
    } catch (error) {
      console.error(error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="register-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
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
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
        <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>
          Cancelar
        </button>
      </form>
    </div>
  );
}