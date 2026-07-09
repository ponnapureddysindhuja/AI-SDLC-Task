let editingId = null;

const form = document.getElementById('taskForm');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const statusInput = document.getElementById('status');
const dueDateInput = document.getElementById('dueDate');
const messageEl = document.getElementById('message');
const listEl = document.getElementById('taskList');
const formTitleEl = document.getElementById('formTitle');

async function loadTasks() {
  const response = await fetch('/api/tasks');
  const tasks = await response.json();
  listEl.innerHTML = '';

  if (!tasks.length) {
    listEl.innerHTML = '<p>No tasks created yet.</p>';
    return;
  }

  tasks.forEach(task => {
    const card = document.createElement('article');
    card.className = 'task-item';
    card.innerHTML = `
      <div>
        <h3>${task.title}</h3>
        <p>${task.description || ''}</p>
        <div class="meta">
          <span>Status: ${task.status}</span>
          <span>Due: ${task.dueDate || 'None'}</span>
        </div>
      </div>
      <div class="actions">
        <button type="button" onclick="editTask(${task.id})">Edit</button>
        <button type="button" class="danger" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    listEl.appendChild(card);
  });
}

window.editTask = async function (id) {
  const response = await fetch(`/api/tasks/${id}`);
  const task = await response.json();
  editingId = task.id;
  formTitleEl.textContent = 'Edit Task';
  titleInput.value = task.title;
  descriptionInput.value = task.description || '';
  statusInput.value = task.status;
  dueDateInput.value = task.dueDate || '';
};

window.deleteTask = async function (id) {
  const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    showMessage('Unable to delete task.');
    return;
  }
  showMessage('Task deleted.');
  await loadTasks();
};

function showMessage(message) {
  messageEl.textContent = message;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  showMessage('');

  const payload = {
    title: titleInput.value,
    description: descriptionInput.value,
    status: statusInput.value,
    dueDate: dueDateInput.value || null
  };

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
    showMessage(data.message || 'Could not save task.');
    return;
  }

  form.reset();
  editingId = null;
  formTitleEl.textContent = 'Add New Task';
  statusInput.value = 'TODO';
  showMessage(editingId ? 'Task updated.' : 'Task created.');
  await loadTasks();
});

loadTasks();
