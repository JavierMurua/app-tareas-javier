import { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="menu-button" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div>
        <button className="close-button" onClick={toggleSidebar}>
          ×
        </button>
        <h2>Privacidad</h2>
        <p className='info'>
          Esta aplicación almacena las tareas localmente en su navegador. No enviamos información a ningún servidor. Sus datos son completamente privados.
        </p>
        <p>
          <a href="http://muruadev.com/preguntas-frecuentes-app-tareas" target="_blank" rel="noopener noreferrer">Conocer más</a>
        </p>
        </div>
        <div>
        <h2>Contacto</h2>
        <p>
          Creado por Javier Murúa.
        </p>
        <p>
          <a href="https://muruadev.com/" target="_blank" rel="noopener noreferrer">Murúa Dev</a>
          <br />
          <a href="https://www.linkedin.com/in/javier-murua/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <br />
          <a href="https://github.com/JavierMurua" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
          </div>
      </div>
    </>
  );
};

export default Sidebar;
