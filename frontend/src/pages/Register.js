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
import { PersonAdd } from '@mui/icons-material';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center p-4">
      <Container maxWidth="sm">
        <Paper elevation={10} className="p-8">
          <Box className="flex flex-col items-center mb-6">
            <Avatar className="bg-green-600 mb-2" sx={{ width: 56, height: 56 }}>
              <PersonAdd />
            </Avatar>
            <Typography variant="h4" component="h1" className="font-bold">
              Create Account
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sign up to start managing your tasks
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box className="flex flex-col gap-4">
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                autoFocus
              />

              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                autoComplete="email"
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
                autoComplete="new-password"
                helperText="Must be at least 6 characters"
              />

              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                fullWidth
                autoComplete="new-password"
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>

              <Box className="text-center">
                <Typography variant="body2">
                  Already have an account?{' '}
                  <Link to="/login" className="text-green-600 hover:underline font-semibold">
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
