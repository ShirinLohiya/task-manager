# Task Manager Frontend

Modern, responsive React application for task management with Material-UI and TailwindCSS.

## Features

- User authentication (Login/Register)
- Task CRUD operations
- Task filtering by category and status
- Search functionality
- File attachment support
- Real-time statistics dashboard
- Admin panel for user and task monitoring
- Responsive design for mobile and desktop

## Tech Stack

- **React** 18.2.0 - UI library
- **React Router** 6.20.1 - Client-side routing
- **Material-UI** 5.15.0 - Component library
- **TailwindCSS** 3.4.0 - Utility-first CSS
- **Axios** - HTTP client
- **React Toastify** - Toast notifications

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will run on `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (one-way operation)

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── AdminRoute.js      # Admin route protection
│   │   ├── Navbar.js           # Navigation bar
│   │   ├── PrivateRoute.js    # Protected route wrapper
│   │   ├── StatCard.js         # Statistics card component
│   │   ├── TaskCard.js         # Task display card
│   │   └── TaskModal.js        # Task create/edit modal
│   ├── context/
│   │   └── AuthContext.js      # Authentication context
│   ├── pages/
│   │   ├── AdminDashboard.js   # Admin panel
│   │   ├── Dashboard.js        # User dashboard
│   │   ├── Login.js            # Login page
│   │   └── Register.js         # Registration page
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── App.js                  # Main app component
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Key Components

### Authentication
- Login and registration forms with validation
- JWT token storage in localStorage
- Protected routes with automatic redirection

### Dashboard
- Task statistics overview
- Filter by category (Personal, Work, Urgent)
- Filter by status (Pending, In Progress, Completed)
- Search tasks by title or description
- Create, edit, and delete tasks

### Admin Dashboard
- User management overview
- System-wide task statistics
- Category breakdown
- Top users by task count
- Complete user and task listings

### Task Management
- Create tasks with title, description, category, status, priority
- Set due dates
- Upload file attachments (up to 5MB)
- Edit and delete tasks
- Visual status indicators

## Styling

The application uses a combination of:
- **TailwindCSS** for utility classes and responsive design
- **Material-UI** for pre-built components
- **Custom CSS** for animations and specific styling needs

## API Integration

All API calls are handled through the `services/api.js` module which provides:
- Automatic JWT token attachment
- Centralized error handling
- Request/response interceptors
- File upload support

## Demo Credentials

**Admin Account:**
- Email: admin@taskmanager.com
- Password: Admin@123

**User Account:**
- Email: user@example.com
- Password: User@123

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
