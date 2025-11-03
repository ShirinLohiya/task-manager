# Task Management Application

A full-stack task management application with user/admin authentication, task categorization, file attachments, and an admin dashboard.

## Tech Stack

- **Frontend**: React.js + TailwindCSS + Material-UI
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer

## Project Structure

```
project-root/
├── frontend/          # React application
├── backend/           # Express API server
├── database/          # Database schema and models
├── postman_collection.json
├── FINAL_SUBMISSION_NOTE.md
└── README.md
```

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will run on `http://localhost:3000`

### Default Admin Credentials

**Email**: admin@taskmanager.com
**Password**: Admin@123

### Default User Credentials

**Email**: user@example.com
**Password**: User@123

## Features

- User registration and authentication
- Role-based access (User/Admin)
- Task CRUD operations
- Task categorization (Personal, Work, Urgent)
- File attachments for tasks
- Task filtering and search
- Admin dashboard with user statistics
- Responsive design

## API Documentation

Import `postman_collection.json` into Postman to test all API endpoints.

## License

MIT License - Educational/Assessment Purpose
