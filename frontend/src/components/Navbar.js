import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { ExitToApp, Dashboard, AdminPanelSettings } from '@mui/icons-material';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <AppBar position="static" className="bg-primary-600">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1">
            Welcome, <strong>{user?.name}</strong>
          </Typography>

          {isAdmin && (
            <Button
              color="inherit"
              startIcon={<AdminPanelSettings />}
              onClick={() => navigate('/admin')}
            >
              Admin Panel
            </Button>
          )}

          {!isAdmin && (
            <Button
              color="inherit"
              startIcon={<Dashboard />}
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
          )}

          <IconButton color="inherit" onClick={handleLogout} title="Logout">
            <ExitToApp />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
