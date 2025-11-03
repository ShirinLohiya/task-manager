import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Avatar
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <Container maxWidth="sm">
        <Paper elevation={10} className="p-8">
          <Box className="flex flex-col items-center mb-6">
            <Avatar className="bg-primary-600 mb-2" sx={{ width: 56, height: 56 }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h4" component="h1" className="font-bold">
              Task Manager
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sign in to manage your tasks
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box className="flex flex-col gap-4">
              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                autoComplete="email"
                autoFocus
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
                autoComplete="current-password"
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                className="bg-primary-600 hover:bg-primary-700"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>

              <Box className="text-center">
                <Typography variant="body2">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary-600 hover:underline font-semibold">
                    Sign Up
                  </Link>
                </Typography>
              </Box>

              <Box className="bg-gray-100 p-3 rounded mt-2">
                <Typography variant="caption" className="block mb-1 font-semibold">
                  Demo Credentials:
                </Typography>
                <Typography variant="caption" className="block">
                  Admin: admin@taskmanager.com / Admin@123
                </Typography>
                <Typography variant="caption" className="block">
                  User: user@example.com / User@123
                </Typography>
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
