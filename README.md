📌 Secure Task Manager

A full-stack Secure Task Manager application that allows users to manage personal tasks with authentication, reminders, and a private dashboard.
Built with Node.js, Express, MongoDB, and Vanilla JavaScript, focusing on security, privacy, and real-world usability.

🚀 Features

🔐 Authentication & Security

- User Registration & Login (JWT based)
- Protected Dashboard (no direct access without login)
- Each user sees only their own tasks
- Secure password hashing
- Logout support

🧑‍💻 User Dashboard

- Personalized welcome message
- Add, edit, delete tasks
- Mark tasks as completed / pending
- View tasks in card view and list view
- Dark / Light mode toggle

⏰ Task Reminders

- Set due date and reminder time for tasks
- Reminder logic stored per task
- Foundation ready for notifications (email / browser / cron)

⚙️ Account Management

- Change password (logged-in users)
- Delete account (removes user + tasks)

🧩 Privacy & Authorization

- Dashboard cannot be opened directly via Live Server
- API protected using JWT middleware
- Tasks are strictly user-scoped

🛠️ Tech Stack

Frontend

- HTML5
- CSS3 (custom styling)
- JavaScript (Vanilla)

Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt for password hashing

📂 Project Structure

SecureTaskManager/
│
├── client/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── dashboard.js
│   │   ├── login.js
│   │   ├── register.js
│   │   └── index.js
│   ├── dashboard.html
│   ├── login.html
│   ├── register.html
│   └── index.html
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   └── Task.js
│
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
