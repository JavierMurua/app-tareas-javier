import { useState, useEffect  } from 'react';
import './App.css';
import Header from './Header';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return savedTasks;
  });
  const [newTask, setNewTask] = useState("");
  const [editedTask, setEditedTask] = useState(null);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false); // Estado para controlar la visibilidad

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Cargar tareas desde localStorage cuando la aplicación se inicia
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Guardar tareas en localStorage cada vez que la lista de tareas cambie
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); 

  const addTask = () => {
    if (newTask.trim() !== "" && !tasks.some((task) => task.text === newTask)) {
      setTasks([{ text: newTask, completed: false }, ...tasks]);
      setNewTask("");
    }
  };

  const editTask = (index) => {
    setEditedTask(index);
    setNewTask(tasks[index].text);
  };

  const updateTask = () => {
    if (editedTask !== null && newTask.trim() !== "") {
      tasks[editedTask].text = newTask;
      setTasks([...tasks]);
      setNewTask("");
      setEditedTask(null);
    }
  };

  const deleteTask = (index) => {
    const confirmDelete = window.confirm("¿Seguro que deseas eliminar esta tarea?");
    if (confirmDelete) {
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      setTasks(newTasks);
    }
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Filtra las tareas no completadas para mostrar en la tabla
  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completeTasks = tasks.filter((task) => task.completed);

  return (
    <div className="App">
      <Header />
      <div className="container">
      <h1>Agrega una nueva tarea</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        {editedTask !== null ? (
          <button onClick={updateTask}>Actualizar</button>
        ) : (
          <button onClick={addTask}>Agregar</button>
        )}
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <div className="task-buttons">
              <button onClick={() => editTask(index)}>Editar</button>
              <button onClick={() => deleteTask(index)}>Eliminar</button>
              <button onClick={() => toggleComplete(index)}>
                {task.completed ? "Pendiente" : "Completada"}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <table>
        <thead>
          <tr>
            <th colSpan="2">Tareas pendientes</th>
          </tr>
        </thead>
        <tbody>
          {incompleteTasks.map((task, index) => (
            <tr key={index}>
              <td>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
              </td>
              <td className="task-buttons-cell">
                <div className="task-buttons">
                  <button onClick={() => editTask(index)}>Editar</button>
                  <button onClick={() => deleteTask(index)}>Eliminar</button>
                  {/* Corregir el índice pasado a toggleComplete */}
                  <button onClick={() => toggleComplete(tasks.indexOf(task))}>
                    {task.completed ? "Pendiente" : "Completada"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <label className="checkbox-label">
      <label className="switch">
      <input
          type="checkbox"
          checked={showCompletedTasks}
          onChange={() => setShowCompletedTasks(!showCompletedTasks)}
        />
        <span className="slider"></span>
    </label>
        Mostrar Tareas Completadas
        </label>
      </div>
      {showCompletedTasks && (
      <table>
        <thead>
          <tr>
            <th colSpan="2">Tareas completadas</th>
          </tr>
        </thead>
        <tbody>
          {completeTasks.map((task, index) => (
            <tr key={index}>
              <td>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
              </td>
              <td className="task-buttons-cell">
                <div className="task-buttons">
                  <button onClick={() => editTask(tasks.indexOf(task))}>Editar</button>
                  <button onClick={() => deleteTask(tasks.indexOf(task))}>Eliminar</button>
                  {/* Corregir el índice pasado a toggleComplete */}
                  <button onClick={() => toggleComplete(tasks.indexOf(task))}>
                    {task.completed ? "Pendiente" : "Completada"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      </div>
    </div>
  );
}

export default App;
