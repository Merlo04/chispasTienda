import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Registro from "./components/Registro.jsx";
import Verificado from "./components/Verificado.jsx";
import Modal from "react-bootstrap/Modal";

function App() {
  const [user, setUser] = useState(null);
  const [modo, setModo] = useState("home");
  const [tokenVerificacion, setTokenVerificacion] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        localStorage.removeItem("token");
      }
    }

    const url = new URL(window.location.href);
    if (url.pathname === "/verificar") {
      const tokenVerificacion = url.searchParams.get("token");
      if (tokenVerificacion) {
        setModo("verificar");
        setTokenVerificacion(tokenVerificacion);
      } else {
        setModo("home");
      }
    }
  }, []);

  const handleLogin = (token) => {
    const decoded = jwtDecode(token);
    setUser(decoded);
    localStorage.setItem("token", token);
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setModo("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setModo("home");
  };

  if (modo === "verificar")
    return <Verificado token={tokenVerificacion} onRedirigir={() => setShowLoginModal(true)} />;

  return (
    <>
      <Home
        user={user}
        onLogout={handleLogout}
        onShowLogin={() => setShowLoginModal(true)}
      />

      {/* MODAL LOGIN */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login
            onLogin={handleLogin}
            onIrARegistro={() => {
              setShowLoginModal(false);
              setShowRegisterModal(true);
            }}
            onVolverAInicio={() => setShowLoginModal(false)}
          />
        </Modal.Body>
      </Modal>

      {/* MODAL REGISTRO */}
      <Modal show={showRegisterModal} onHide={() => setShowRegisterModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Registro
            onIrALogin={() => {
              setShowRegisterModal(false);
              setShowLoginModal(true);
            }}
            onVolverAInicio={() => setShowRegisterModal(false)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;