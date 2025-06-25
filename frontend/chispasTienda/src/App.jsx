import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);

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
  }, []);

  const handleLogin = (token) => {
    const decoded = jwtDecode(token);
    setUser(decoded);
    localStorage.setItem("token", token);
    setMostrarLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <>
      {mostrarLogin ? (
        <Login onLogin={handleLogin} onClose={() => setMostrarLogin(false)} />
      ) : (
        <Home user={user} onLogout={handleLogout} onShowLogin={() => setMostrarLogin(true)} />
      )}
    </>
  );
}

export default App;