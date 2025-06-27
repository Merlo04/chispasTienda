// src/components/Home.jsx
import { useState } from "react";
import Navbar from "../components/NavBar.jsx";
import CarouselComponent from "../components/Carousel.jsx";
import Productos from "../components/Productos.jsx";
import Contacto from "../components/Contacto.jsx";
import Carrito from "../components/Carrito.jsx";
import CrearProductoModal from "./CrearProdcutoModal.jsx";

function Home({ user, onLogout, onShowLogin, onShowRegister }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todo");
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [mostrarCrearModal, setMostrarCrearModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const toggleSidebar = () => setSidebarAbierto(!sidebarAbierto);

  return (
    <div className="home">
      {/* TOPBAR */}
      <header className="topbar">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          {sidebarAbierto ? "✖" : "☰"}
        </button>
        <h1 className="titulo-navbar">Chispas Tienda</h1>
        <div className="topbar-right">
          <input
            type="text"
            placeholder="Buscar productos..."
            onChange={(e) => setBusqueda(e.target.value)}
            className="buscador-input"
          />
          {user ? (
            <button onClick={onLogout}>Cerrar sesión</button>
          ) : (
            <>
              <button onClick={onShowLogin}>Iniciar sesión</button>
              <button onClick={onShowRegister}>Registrarse</button>
            </>
          )}
          <button onClick={() => setMostrarCarrito(!mostrarCarrito)}>🛒</button>
        </div>
      </header>

      {mostrarCarrito && <Carrito onClose={() => setMostrarCarrito(false)} />}

      {/* NAVBAR (Sidebar) */}
      <Navbar
        abierto={sidebarAbierto}
        toggleSidebar={toggleSidebar}
        onCategoriaSeleccionada={setCategoriaSeleccionada}
      />

      <main className="main-content">
        <CarouselComponent />
        <h2 className="titulo-seccion">Productos</h2>

        {user?.rol === "admin" && (
          <button
            className="btn-crear-producto"
            onClick={() => setMostrarCrearModal(true)}
          >
            + Crear nuevo producto
          </button>
        )}

        <Productos
          categoria={categoriaSeleccionada}
          busqueda={busqueda}
          user={user}
        />
        <Contacto />
      </main>

      {mostrarCrearModal && (
        <CrearProductoModal
          show={mostrarCrearModal}
          handleClose={() => setMostrarCrearModal(false)}
          onProductoCreado={() => window.location.reload()}
        />
      )}
    </div>
  );
}

export default Home;


