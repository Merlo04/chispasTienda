import { useState } from 'react';
import Navbar from '../components/NavBar.jsx';
import CarouselComponent from '../components/Carousel.jsx';
import Productos from '../components/Productos.jsx';
import Contacto from '../components/Contacto.jsx';

function Home() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todo');
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  const toggleSidebar = () => setSidebarAbierto(!sidebarAbierto);

  return (
    <div className="home">
      <header className="topbar">
        <button className="hamburger-btn" onClick={toggleSidebar}>☰</button>
        <h1 className="titulo-navbar">Chispas Tienda</h1>
        <div className="carrito-icon">🛒 <span className="contador-carrito">0</span></div>
      </header>

      <Navbar
        abierto={sidebarAbierto}
        toggleSidebar={toggleSidebar}
        onCategoriaSeleccionada={setCategoriaSeleccionada}
      />

      <main className="main-content">
        <CarouselComponent />
        <h2 className="titulo-seccion">Productos</h2>
        <Productos categoria={categoriaSeleccionada} />
        <Contacto />
      </main>
    </div>
  );
}

export default Home;