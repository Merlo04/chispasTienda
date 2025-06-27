import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Verificado({ token, onRedirigir }) {
  const [mensaje, setMensaje] = useState("Verificando cuenta...");
  const [verificado, setVerificado] = useState(false);
  const yaVerificado = useRef(false); // ← referencia para evitar múltiples verificaciones

  useEffect(() => {
    if (!token) {
      setMensaje("❌ Token no proporcionado.");
      return;
    }

    if (yaVerificado.current) return; // Ya verificó, no volver a ejecutar
    yaVerificado.current = true;

    axios
      .get(`http://localhost:3001/api/usuarios/verificar?token=${token}`)
      .then(() => {
        setMensaje("✅ Cuenta verificada correctamente!");
        setVerificado(true);

        setTimeout(() => {
          onRedirigir();
        }, 3000);
      })
      .catch(() => {
        if (!verificado) {
          setMensaje("❌ Error al verificar tu cuenta. El enlace puede haber expirado o ya fue utilizado.");
        }
      });
  }, [token, onRedirigir, verificado]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{mensaje}</h2>
      {verificado && <p>Redirigiendo al inicio de sesión...</p>}
    </div>
  );
}