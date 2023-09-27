import React from 'react';
import './Header.css'; // Asegúrate de tener un archivo CSS para este componente

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">Mi Lista de Tareas</h1>
      {/* <button className="header-button">Nueva Tarea</button> */}
    </header>
  );
}

export default Header;
