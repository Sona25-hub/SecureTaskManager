// ================= AUTH CHECK =================
const token = localStorage.getItem("token");
if (!token) {
  alert("You must login first!");
  window.location.href = "login.html";
}

// ================= ELEMENTS =================
const addTaskForm = document.getElementById("addTaskForm");
const taskCardsContainer = document.getElementById("taskCardsContainer");
const viewTaskListBtn = document.getElementById("viewTaskList");
const taskListSection = document.getElementById("taskListSection");
const taskListContainer = document.getElementById("taskListContainer");
const logoutBtn = document.getElementById("logoutBtn");
const toggleModeBtn = document.getElementById("toggleMode");
const welcomeUser = document.getElementById("welcomeUser");

const changePasswordBtn = document.getElementById("changePasswordBtn");
const deleteAccountBtn = document.getElementById("deleteAccountBtn");

let tasks = [];

// ================= FETCH USER =================
async function fetchUser() {
  try {
    const res = await fetch("http://localhost:5000/api/protected", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    welcomeUser.textContent = `Welcome, ${data.user.name}!`;
  } catch {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
}

// ================= FETCH TASKS =================
async function fetchTasks() {
  const res = await fetch("http://localhost:5000/api/tasks", {
    headers: { Authorization: `Bearer ${token}` }
  });
  tasks = await res.json();
  renderTasks();
}

// ================= RENDER TASKS =================
function renderTasks() {
  taskCardsContainer.innerHTML = "";
  taskListContainer.innerHTML = "";

  tasks.forEach(task => {
    const card = document.createElement("div");
    card.className = "task-card";

    card.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Due: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</p>
      ${task.reminderAt ? `<p>⏰ Reminder: ${new Date(task.reminderAt).toLocaleString()}</p>` : ""}
      <p>Status:
        <span class="${task.completed ? "completed" : "pending"}">
          ${task.completed ? "Completed" : "Pending"}
        </span>
      </p>
      <div class="task-actions">
        <button class="btn btn-primary" onclick="toggleComplete('${task._id}')">
          ${task.completed ? "Undo" : "Complete"}
        </button>
        <button class="btn btn-secondary" onclick="editTask('${task._id}')">Edit</button>
        <button class="btn btn-danger" onclick="deleteTask('${task._id}')">Delete</button>
      </div>
    `;

    taskCardsContainer.appendChild(card);

    const li = document.createElement("li");
    li.textContent = `${task.title} - ${task.completed ? "Completed" : "Pending"}`;
    taskListContainer.appendChild(li);
  });
}

// ================= ADD TASK =================
addTaskForm.addEventListener("submit", async e => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;
  const reminderAt = document.getElementById("reminderAt").value;

  const res = await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, description, dueDate, reminderAt })
  });

  const data = await res.json();
  tasks.push(data.task);
  renderTasks();
  addTaskForm.reset();
});

// ================= REMINDER CHECKER =================
setInterval(() => {
  const now = new Date();

  tasks.forEach(task => {
    if (
      task.reminderAt &&
      !task.reminded &&
      new Date(task.reminderAt) <= now
    ) {
      alert(`⏰ Reminder: ${task.title}`);
      task.reminded = true;
    }
  });
}, 30000); // checks every 30 seconds

// ================= TASK ACTIONS =================
async function toggleComplete(id) {
  const task = tasks.find(t => t._id === id);
  await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ completed: !task.completed })
  });
  task.completed = !task.completed;
  renderTasks();
}

async function editTask(id) {
  const task = tasks.find(t => t._id === id);
  const newTitle = prompt("Edit Title", task.title);
  const newDesc = prompt("Edit Description", task.description);
  if (!newTitle || !newDesc) return;

  await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title: newTitle, description: newDesc })
  });

  task.title = newTitle;
  task.description = newDesc;
  renderTasks();
}

async function deleteTask(id) {
  await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  tasks = tasks.filter(t => t._id !== id);
  renderTasks();
}

// ================= TASK LIST TOGGLE =================
viewTaskListBtn.addEventListener("click", () => {
  taskListSection.style.display =
    taskListSection.style.display === "none" ? "block" : "none";
});

// ================= CHANGE PASSWORD =================
changePasswordBtn.addEventListener("click", async () => {
  const currentPassword = prompt("Current password:");
  const newPassword = prompt("New password:");
  if (!currentPassword || !newPassword) return;

  const res = await fetch("http://localhost:5000/api/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ currentPassword, newPassword })
  });

  const data = await res.json();
  alert(data.message);
});

// ================= DELETE ACCOUNT =================
deleteAccountBtn.addEventListener("click", async () => {
  if (!confirm("Delete account permanently?")) return;

  const res = await fetch("http://localhost:5000/api/delete-account", {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  alert(data.message);
  localStorage.removeItem("token");
  window.location.href = "register.html";
});

// ================= LOGOUT =================
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

// ================= DARK MODE =================
toggleModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// ================= INIT =================
fetchUser();
fetchTasks();
