import './Header.css'; // Asegúrate de tener un archivo CSS para este componente
import Sidebar from './Sidebar';

function Header() {
  return (
    <header className="header">
      <Sidebar />
      <h1 className="header-title">Mi Lista de Tareas</h1>
      {/* <button className="header-button">Nueva Tarea</button> */}
    </header>
  );
}

export default Header;
