# Task Manager Backend API

RESTful API for Task Management Application built with Node.js, Express, and MongoDB.

## Features

- JWT Authentication (User/Admin roles)
- Task CRUD operations
- File upload for task attachments
- Admin dashboard endpoints
- Input validation
- Secure password hashing
- Role-based access control

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Validation**: express-validator

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

4. Start the server:

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Tasks
- `GET /api/tasks` - Get all tasks for logged-in user (Protected)
- `GET /api/tasks/:id` - Get single task (Protected)
- `POST /api/tasks` - Create new task with optional file attachment (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)
- `GET /api/tasks/stats/me` - Get task statistics (Protected)

### Admin
- `GET /api/admin/stats` - Get dashboard statistics (Admin only)
- `GET /api/admin/users` - Get all users (Admin only)
- `GET /api/admin/users/:id` - Get single user with stats (Admin only)
- `PUT /api/admin/users/:id` - Update user (Admin only)
- `DELETE /api/admin/users/:id` - Delete user (Admin only)
- `GET /api/admin/tasks` - Get all tasks (Admin only)

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## File Upload

Tasks support file attachments. Send file as `multipart/form-data` with field name `attachment`.

**Allowed file types:** JPEG, PNG, GIF, PDF, DOC, DOCX, TXT, ZIP

**Maximum file size:** 5MB

## Error Handling

All endpoints return JSON responses with the following structure:

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message"
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js       # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js           # JWT verification & authorization
│   │   └── upload.js         # Multer file upload config
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── adminRoutes.js
│   └── app.js                # Express app setup
├── uploads/                  # File upload directory
├── .env.example
├── package.json
└── README.md
```

## Default Accounts

For testing purposes, you can create an admin account by registering with:
```json
{
  "name": "Admin User",
  "email": "admin@taskmanager.com",
  "password": "Admin@123",
  "role": "admin"
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation
- File type validation
- File size limits
- CORS configuration

## License

MIT
