function NavBar({ abierto, toggleSidebar, onCategoriaSeleccionada }) {
  const categorias = ['todo', 'Cartuchera', 'Neceser', 'Estuche', 'Mochila'];

  return (
    <aside className={`sidebar ${abierto ? 'abierto' : ''}`}>
      <button className="close-btn" onClick={toggleSidebar}>✖</button>
      <h2 className="titulo-navbar">Categorías</h2>
      <ul>
        {categorias.map(cat => (
          <li key={cat} onClick={() => { onCategoriaSeleccionada(cat); toggleSidebar(); }}>
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default NavBar;