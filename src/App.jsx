import React, { useState } from 'react';
import './App.css';
import Header from './Header';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editedTask, setEditedTask] = useState(null);

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
      <div>
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
      </div>
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
