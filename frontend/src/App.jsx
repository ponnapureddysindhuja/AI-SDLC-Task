import { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  description: '',
  status: 'TODO',
  dueDate: ''
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError('Unable to load tasks.');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const payload = {
      ...form,
      dueDate: form.dueDate || null
    };

    try {
      const response = editingId
        ? await fetch(`/api/tasks/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
        : await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Could not save task.');
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description || '',
      status: task.status,
      dueDate: task.dueDate || ''
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Delete failed.');
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app-shell">
      <header>
        <h1>Task Manager</h1>
        <p>Organize your work with simple CRUD actions.</p>
      </header>

      <main className="content-grid">
        <section className="card">
          <h2>{editingId ? 'Edit Task' : 'Add New Task'}</h2>
          <form onSubmit={handleSubmit} className="task-form">
            <input
              type="text"
              placeholder="Task title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              maxLength={100}
              required
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              maxLength={500}
            />
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
            <button type="submit">{editingId ? 'Update Task' : 'Create Task'}</button>
          </form>
          {error && <p className="error">{error}</p>}
        </section>

        <section className="card">
          <h2>Tasks</h2>
          <div className="task-list">
            {tasks.map((task) => (
              <article className="task-item" key={task.id}>
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <div className="meta">
                    <span>Status: {task.status}</span>
                    <span>Due: {task.dueDate || 'None'}</span>
                  </div>
                </div>
                <div className="actions">
                  <button onClick={() => startEdit(task)}>Edit</button>
                  <button className="danger" onClick={() => handleDelete(task.id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
