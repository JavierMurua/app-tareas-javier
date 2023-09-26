import React, { useState, useEffect  } from 'react';
import './App.css';
import Header from './Header';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return savedTasks;
  });
  const [newTask, setNewTask] = useState('');
  const [editedTask, setEditedTask] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  // Cargar tareas desde localStorage cuando la aplicación se inicia
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);// 14:40 

  // Guardar tareas en localStorage cada vez que la lista de tareas cambie
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); // 14:40 

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([{ text: newTask, completed: false }, ...tasks]);
      setNewTask('');
    }
  };

  const editTask = (index) => {
    setEditedTask(index);
    setNewTask(tasks[index].text);
  };

  const updateTask = () => {
    if (editedTask !== null && newTask.trim() !== '') {
      tasks[editedTask].text = newTask;
      setTasks([...tasks]);
      setNewTask('');
      setEditedTask(null);
    }
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <Header />
      <h1>Lista de Tareas</h1>
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
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.text}
            </span>
            <div className="task-buttons">
    <button onClick={() => editTask(index)}>Editar</button>
    <button onClick={() => deleteTask(index)}>Eliminar</button>
    <button onClick={() => toggleComplete(index)}>
      {task.completed ? 'Pendiente' : 'Completada'}
    </button>
  </div>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
