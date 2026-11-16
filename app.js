const STORAGE_KEY = "todo-app.tasks";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const taskCount = document.getElementById("task-count");

let tasks = loadTasks();

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Storage may be unavailable (e.g. private mode); the app still works for this session.
  }
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function addTask(text) {
  tasks.push({ id: makeId(), text, done: false });
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.done = !task.done;
    saveTasks();
    render();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

function render() {
  list.innerHTML = "";

  for (const task of tasks) {
    const item = document.createElement("li");
    item.className = "task" + (task.done ? " done" : "");
    item.dataset.id = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "task-" + task.id;
    checkbox.checked = task.done;

    const label = document.createElement("label");
    label.className = "task-text";
    label.htmlFor = checkbox.id;
    label.textContent = task.text; // textContent avoids HTML injection

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✕";
    deleteBtn.setAttribute("aria-label", "Delete task: " + task.text);

    item.append(checkbox, label, deleteBtn);
    list.append(item);
  }

  const remaining = tasks.filter((t) => !t.done).length;
  emptyState.classList.toggle("hidden", tasks.length > 0);
  taskCount.classList.toggle("hidden", tasks.length === 0);
  taskCount.textContent = `${remaining} of ${tasks.length} task${tasks.length === 1 ? "" : "s"} remaining`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTask(text);
  input.value = "";
  input.focus();
});

// One listener on the list handles every task's checkbox and delete button.
list.addEventListener("change", (event) => {
  if (event.target.matches('input[type="checkbox"]')) {
    toggleTask(event.target.closest(".task").dataset.id);
  }
});

list.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-btn");
  if (button) {
    deleteTask(button.closest(".task").dataset.id);
  }
});

render();
