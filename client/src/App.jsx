import { useEffect, useState } from 'react';
import { addTask, deleteTask, fetchTasks, updateTask } from './api.js';
import TaskForm from './components/TaskForm.jsx';
import TaskItem from './components/TaskItem.jsx';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    try {
      setLoading(true);
      setError('');
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(text) {
    const created = await addTask(text);
    setTasks((prev) => [created, ...prev]);
  }

  async function handleToggle(id, completed) {
    const updated = await updateTask(id, { completed });
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  }

  async function handleEdit(id, text) {
    const updated = await updateTask(id, { text });
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  }

  async function handleDelete(id) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  }

  return (
    <div className="container">
      <h1>MERN To-Do</h1>
      <div className="subtitle">Create, Read, Update, Delete tasks with MongoDB + Express + React + Node</div>

      <TaskForm onAdd={handleAdd} />

      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="muted">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="muted">No tasks yet. Add your first task!</div>
      ) : (
        <ul className="list">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
