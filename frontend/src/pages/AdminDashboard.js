import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Tabs,
  Tab
} from '@mui/material';
import {
  People,
  Assignment,
  CheckCircle,
  PendingActions
} from '@mui/icons-material';
import { toast } from 'react-toastify';

import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import { adminAPI } from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, tasksRes] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getAllUsers(),
        adminAPI.getAllTasks()
      ]);

      setStats(statsRes.data.data);
      setUsers(usersRes.data.data);
      setTasks(tasksRes.data.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Container maxWidth="xl" className="py-8">
        <Typography variant="h4" className="font-bold mb-6">
          Admin Dashboard
        </Typography>

        {loading ? (
          <Box className="flex justify-center py-10">
            <div className="loading-spinner"></div>
          </Box>
        ) : (
          <>
            {/* Statistics Overview */}
            <Grid container spacing={3} className="mb-6">
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Total Users"
                  value={stats?.users?.total || 0}
                  icon={<People />}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Active Users"
                  value={stats?.users?.active || 0}
                  icon={<People />}
                  color="success"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Total Tasks"
                  value={stats?.tasks?.total || 0}
                  icon={<Assignment />}
                  color="info"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Completed Tasks"
                  value={stats?.tasks?.completed || 0}
                  icon={<CheckCircle />}
                  color="success"
                />
              </Grid>
            </Grid>

            {/* Category Breakdown */}
            <Grid container spacing={3} className="mb-6">
              <Grid item xs={12} sm={4}>
                <StatCard
                  title="Personal Tasks"
                  value={stats?.categories?.personal || 0}
                  icon={<Assignment />}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <StatCard
                  title="Work Tasks"
                  value={stats?.categories?.work || 0}
                  icon={<Assignment />}
                  color="info"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <StatCard
                  title="Urgent Tasks"
                  value={stats?.categories?.urgent || 0}
                  icon={<Assignment />}
                  color="error"
                />
              </Grid>
            </Grid>

            {/* Tables */}
            <Paper className="mb-6">
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Users" />
                <Tab label="Tasks" />
                <Tab label="Top Users" />
              </Tabs>

              <Box className="p-4">
                {activeTab === 0 && (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Name</strong></TableCell>
                          <TableCell><strong>Email</strong></TableCell>
                          <TableCell><strong>Role</strong></TableCell>
                          <TableCell><strong>Status</strong></TableCell>
                          <TableCell><strong>Joined</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user._id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Chip
                                label={user.role}
                                color={user.role === 'admin' ? 'error' : 'default'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={user.isActive ? 'Active' : 'Inactive'}
                                color={user.isActive ? 'success' : 'default'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>{formatDate(user.createdAt)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}

                {activeTab === 1 && (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Title</strong></TableCell>
                          <TableCell><strong>User</strong></TableCell>
                          <TableCell><strong>Category</strong></TableCell>
                          <TableCell><strong>Status</strong></TableCell>
                          <TableCell><strong>Priority</strong></TableCell>
                          <TableCell><strong>Created</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tasks.slice(0, 20).map((task) => (
                          <TableRow key={task._id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.user?.name || 'N/A'}</TableCell>
                            <TableCell>
                              <Chip label={task.category} size="small" />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={task.status}
                                color={
                                  task.status === 'completed'
                                    ? 'success'
                                    : task.status === 'in-progress'
                                    ? 'warning'
                                    : 'default'
                                }
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <Chip label={task.priority} size="small" variant="outlined" />
                            </TableCell>
                            <TableCell>{formatDate(task.createdAt)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}

                {activeTab === 2 && (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>User Name</strong></TableCell>
                          <TableCell><strong>Email</strong></TableCell>
                          <TableCell><strong>Task Count</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stats?.topUsers?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.userName}</TableCell>
                            <TableCell>{item.userEmail}</TableCell>
                            <TableCell>
                              <Chip label={item.taskCount} color="primary" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            </Paper>
          </>
        )}
      </Container>
    </div>
  );
};

export default AdminDashboard;
