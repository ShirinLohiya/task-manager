# Quick Start Guide - 5 Minutes Setup

Get the Task Manager Application running in under 5 minutes!

## Prerequisites
- Node.js v16+ installed
- MongoDB running (local or Atlas)

## Setup Commands

### 1. Backend (Terminal 1)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

### 2. Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```

## Access

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## Test Immediately

1. Register at http://localhost:3000/register
2. Create your first task
3. Done! ✅

## Demo Credentials (Create via Register or Postman)

**Admin**: admin@taskmanager.com / Admin@123
**User**: user@example.com / User@123

## Need Help?

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

## Default Configuration

The application works out-of-the-box with:
- Backend: Port 5000
- Frontend: Port 3000
- Database: MongoDB (configure in .env)

## Postman Testing

1. Import `postman_collection.json`
2. Register/Login to get token
3. Test all endpoints

---

That's it! Start building your task list! 🚀
