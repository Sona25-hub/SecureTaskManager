## Secure Task Manager

Secure Task Manager is a professional web-based task management application designed to help users efficiently organize and track their daily tasks. It provides a secure authentication system with user registration and login, ensuring all user data is protected using JWT-based authentication. The project is ideal for individuals or small teams looking for a simple, secure, and interactive task management solution.

## About the Project

This project allows users to register, log in, and manage their tasks with full CRUD (Create, Read, Update, Delete) functionality. Each task includes a title, description, due date, optional reminders, and completion status. Users can mark tasks as complete, edit or delete them, and receive reminders when tasks are due. The system also provides features for changing passwords and deleting accounts, ensuring complete user control over personal data.

The application is built with a modular structure, separating backend routes, middleware, models, and frontend logic to ensure scalability, maintainability, and readability.

## Features

- Secure Authentication: User registration and login with JWT tokens.

- Task Management: Add, update, delete, and mark tasks as complete.

- Task Reminders: Notifications for upcoming tasks.

- Dashboard: Interactive view of tasks in card and list format.

- User Account Management: Change password and delete account options.

- Dark Mode: Toggle between light and dark mode for personalized experience.

- Modular Architecture: Organized backend and frontend structure for scalability.

## Technology Stack

- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication & Security: bcryptjs for password hashing, jsonwebtoken for JWT-based authentication
- Tools & Modules: nodemon, cors, dotenv, and other essential npm packages

## Requirements

Before setting up this project, ensure the following are installed:

* Node.js (v14 or higher) – https://nodejs.org/en/download/

* MongoDB (local or Atlas) – https://www.mongodb.com/

* Visual Studio Code (recommended) – https://code.visualstudio.com/

## Setup & Installation

1. Clone the repository:

git clone https://github.com/Sona25-hub/SecureTaskManager.git
cd SecureTaskManager


2. Install dependencies:

npm install


3. Create a .env file in the root directory and add the following variables:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/securetaskmanager
JWT_SECRET=yourSecretKey


4. Start the server:

node server.js
The backend will run at http://localhost:5000.

5. Open the frontend:
Open client/index.html in your browser to access the application.

- Demo User

For testing without creating a new account, you can use the following demo credentials:

Email: demo@securetask.com
Password: Demo@1234

You can log in using these credentials and explore all the functionalities of the task manager, including adding, editing, deleting tasks, marking tasks complete, and testing reminders.

## Usage

* Register / Login: Create a new account or log in with existing credentials.
* Dashboard: View tasks in card and list format.
* Add Task: Enter task title, description, due date, and optional reminders.
* Edit/Delete Task: Update or remove existing tasks.
* Mark as Complete: Toggle task completion status.
* Account Options: Change password or delete your account permanently.
* Dark Mode: Toggle UI theme for a better visual experience.

## Project Roadmap

- Implement secure user authentication with JWT
- Add task CRUD functionality
- Enable task reminders and notifications
- Create interactive dashboard for task visualization


## Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Ensure the code is modular, readable, and well-commented.

## License

This project is open-source and licensed under the MIT License.

## Acknowledgements

* Node.js and Express.js for backend development
* MongoDB for database management
* bcryptjs and jsonwebtoken for authentication
* All contributors and open-source resources used