# Complete Setup Guide - Task Manager Application

This guide will help you set up and run the Task Management Application from scratch.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - Choose one:
  - [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Local)
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud - Free tier available)
- **Git** (optional) - For version control
- **Postman** (optional) - For API testing

### Verify Installation

```bash
node --version   # Should show v16.x.x or higher
npm --version    # Should show 8.x.x or higher
mongo --version  # Should show MongoDB version (if using local)
```

---

## 🚀 Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd "C:\Users\lohiy\OneDrive\Desktop\task manager"
```

### Step 2: Backend Setup

#### 2.1 Install Backend Dependencies

```bash
cd backend
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- multer
- express-validator
- morgan
- nodemon (dev)

#### 2.2 Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env
```

Edit the `.env` file with your configuration:

**For Local MongoDB:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRES_IN=7d
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
FRONTEND_URL=http://localhost:3000
```

**For MongoDB Atlas (Cloud):**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRES_IN=7d
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
FRONTEND_URL=http://localhost:3000
```

**Important:** Replace the MongoDB URI with your actual connection string!

#### 2.3 Create Uploads Directory

```bash
# The directory should already exist, but verify:
mkdir uploads
```

#### 2.4 Start Backend Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

You should see:
```
╔═══════════════════════════════════════╗
║   Task Manager API Server Running    ║
║   Port: 5000                          ║
║   Environment: development            ║
╚═══════════════════════════════════════╝
MongoDB Connected: localhost
```

Keep this terminal open!

---

### Step 3: Frontend Setup

Open a **NEW TERMINAL WINDOW**

#### 3.1 Install Frontend Dependencies

```bash
cd frontend
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- @mui/material
- @mui/icons-material
- @emotion/react
- @emotion/styled
- react-toastify
- tailwindcss
- react-scripts

#### 3.2 Configure Environment (Optional)

```bash
# Copy the example file
cp .env.example .env
```

The default configuration should work:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

#### 3.3 Start Frontend Server

```bash
npm start
```

The app will automatically open in your browser at `http://localhost:3000`

If it doesn't open automatically, manually navigate to `http://localhost:3000`

---

## 🎯 First Time Setup

### Create Admin Account

1. Go to `http://localhost:3000/register`
2. Fill in the form:
   - **Name**: Admin User
   - **Email**: admin@taskmanager.com
   - **Password**: Admin@123
   - **Confirm Password**: Admin@123

**Note:** To make this user an admin, you need to either:
- Use Postman with the registration endpoint and include `"role": "admin"` in the request body
- Or manually update the user in MongoDB

### Using Postman to Create Admin:

1. Import `postman_collection.json` into Postman
2. Use the "Register Admin" request
3. The request includes `"role": "admin"` in the body

### Create Regular User Account

1. Go to `http://localhost:3000/register`
2. Fill in the form with your details
3. Click "Sign Up"
4. You'll be automatically logged in and redirected to the dashboard

---

## 🧪 Testing the Application

### Manual Testing

1. **Register and Login**
   - Create a new account
   - Verify you're redirected to dashboard
   - Check that token is stored (check browser DevTools > Application > Local Storage)

2. **Create Tasks**
   - Click "Create Task" button
   - Fill in all fields
   - Try uploading a file
   - Submit and verify task appears

3. **Filter and Search**
   - Use category filter dropdown
   - Use status filter dropdown
   - Type in search box to search tasks

4. **Edit Tasks**
   - Click edit icon on a task
   - Modify fields
   - Save and verify changes

5. **Delete Tasks**
   - Click delete icon
   - Confirm deletion
   - Verify task is removed

6. **Admin Dashboard** (if you have admin account)
   - Navigate to Admin Panel
   - View statistics
   - Browse users and tasks
   - Check different tabs

### API Testing with Postman

1. **Import Collection**
   - Open Postman
   - Click Import
   - Select `postman_collection.json`

2. **Set Base URL**
   - Collection variables should already be set
   - Verify `baseUrl` is `http://localhost:5000/api`

3. **Test Authentication**
   - Run "Register User" or "Login" request
   - Token should be automatically saved to environment
   - Run "Get Current User" to verify authentication

4. **Test Task Operations**
   - Create Task
   - Get All Tasks
   - Update Task
   - Delete Task

5. **Test Admin Endpoints** (requires admin token)
   - Get Dashboard Statistics
   - Get All Users
   - Get All Tasks (Admin)

---

## 📱 Accessing the Application

### Frontend
```
http://localhost:3000
```

**Pages:**
- Login: `http://localhost:3000/login`
- Register: `http://localhost:3000/register`
- Dashboard: `http://localhost:3000/dashboard`
- Admin Panel: `http://localhost:3000/admin`

### Backend API
```
http://localhost:5000
```

**Health Check:**
```
http://localhost:5000/api/health
```

**API Documentation:**
See [backend/README.md](backend/README.md) for all endpoints

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error: "MongooseServerSelectionError"**

**Solutions:**
1. **Local MongoDB not running:**
   ```bash
   # Windows
   net start MongoDB

   # Mac/Linux
   sudo systemctl start mongod
   ```

2. **Wrong connection string:**
   - Check `.env` file
   - Verify MongoDB URI is correct
   - For Atlas, ensure IP whitelist includes your IP

3. **MongoDB not installed:**
   - Install MongoDB Community Server
   - Or use MongoDB Atlas (cloud)

### Port Already in Use

**Error: "Port 5000 is already in use"**

**Solutions:**
1. **Kill the process using the port:**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F

   # Mac/Linux
   lsof -ti:5000 | xargs kill -9
   ```

2. **Change the port in `.env`:**
   ```env
   PORT=5001
   ```

### Frontend Not Loading

**Error: "Cannot GET /"**

**Solutions:**
1. Ensure backend is running on port 5000
2. Check `proxy` in `frontend/package.json` is set to `http://localhost:5000`
3. Clear browser cache
4. Try `npm start` again

### CORS Issues

**Error: "Access-Control-Allow-Origin"**

**Solutions:**
1. Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
2. Ensure CORS is configured in `backend/src/app.js`
3. Check browser console for specific CORS error

### File Upload Not Working

**Solutions:**
1. Verify `uploads` directory exists in backend
2. Check file size (max 5MB)
3. Verify file type is allowed (JPEG, PNG, PDF, DOC, DOCX, TXT, ZIP)
4. Check backend console for Multer errors

### Authentication Issues

**Error: "Not authorized to access this route"**

**Solutions:**
1. Log out and log in again
2. Check if token exists in localStorage
3. Verify token hasn't expired (7 days by default)
4. Check browser DevTools > Network tab for 401 errors

---

## 🔧 Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- **Backend**: Uses `nodemon` - auto-restarts on file changes
- **Frontend**: Uses `react-scripts` - auto-refreshes browser

### Database GUI Tools

For easier database management, install:
- **MongoDB Compass** (Official GUI) - [Download](https://www.mongodb.com/products/compass)
- **Robo 3T** (Lightweight) - [Download](https://robomongo.org/)

Connect to: `mongodb://localhost:27017/taskmanager`

### Code Editor

Recommended: **Visual Studio Code** with extensions:
- ESLint
- Prettier
- ES7+ React/Redux/React-Native snippets
- MongoDB for VS Code

---

## 📦 Building for Production

### Backend Production Build

```bash
cd backend
npm start
```

Set environment variables for production:
```env
NODE_ENV=production
MONGODB_URI=<production_database_uri>
JWT_SECRET=<strong_random_secret>
```

### Frontend Production Build

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build/` folder.

To serve the build:
```bash
npm install -g serve
serve -s build
```

---

## 🎓 Next Steps

1. **Explore the Code**
   - Review backend controllers in `backend/src/controllers/`
   - Check frontend components in `frontend/src/components/`
   - Study the API routes in `backend/src/routes/`

2. **Read Documentation**
   - [Main README](README.md) - Project overview
   - [Backend README](backend/README.md) - API documentation
   - [Frontend README](frontend/README.md) - UI documentation
   - [Database Schema](database/schema.md) - Data structure
   - [Final Submission Note](FINAL_SUBMISSION_NOTE.md) - Complete analysis

3. **Experiment**
   - Create multiple users
   - Add various tasks
   - Test filtering and search
   - Upload different file types
   - Explore admin dashboard

4. **Customize**
   - Modify color scheme in `frontend/tailwind.config.js`
   - Add new task categories
   - Extend API endpoints
   - Add new features

---

## 📞 Support

If you encounter any issues:

1. **Check Error Messages**: Read console errors carefully
2. **Review Logs**: Check terminal output for both frontend and backend
3. **Verify Configuration**: Double-check `.env` files
4. **Test API**: Use Postman to test endpoints independently
5. **Database**: Use MongoDB Compass to inspect data

---

## ✅ Verification Checklist

Before considering setup complete, verify:

- [ ] Backend server running on port 5000
- [ ] MongoDB connected successfully
- [ ] Frontend running on port 3000
- [ ] Can register a new user
- [ ] Can login with credentials
- [ ] Can create a task
- [ ] Can view tasks in dashboard
- [ ] Can filter tasks
- [ ] Can upload file attachment
- [ ] Can edit and delete tasks
- [ ] Admin dashboard accessible (if admin account created)
- [ ] Postman collection works

---

**Congratulations! Your Task Manager Application is now running! 🎉**

Enjoy exploring and testing the application!
