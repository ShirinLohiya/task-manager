import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Paper
} from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import {
  CheckCircle,
  PendingActions,
  WorkOutline,
  Warning
} from '@mui/icons-material';
import { toast } from 'react-toastify';

import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import StatCard from '../components/StatCard';
import { taskAPI } from '../services/api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    search: ''
  });

  useEffect(() => {
    loadTasks();
    loadStats();
  }, []);

  const loadTasks = async (filterParams = filters) => {
    setLoading(true);
    try {
      const response = await taskAPI.getTasks(filterParams);
      setTasks(response.data.data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await taskAPI.getMyStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to load stats');
    }
  };

  const handleCreateTask = async (formData) => {
    setLoading(true);
    try {
      await taskAPI.createTask(formData);
      toast.success('Task created successfully');
      setModalOpen(false);
      loadTasks();
      loadStats();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (formData) => {
    setLoading(true);
    try {
      await taskAPI.updateTask(selectedTask._id, formData);
      toast.success('Task updated successfully');
      setModalOpen(false);
      setSelectedTask(null);
      loadTasks();
      loadStats();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskAPI.deleteTask(taskId);
      toast.success('Task deleted successfully');
      loadTasks();
      loadStats();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleFilterChange = (e) => {
    const newFilters = {
      ...filters,
      [e.target.name]: e.target.value
    };
    setFilters(newFilters);
    loadTasks(newFilters);
  };

  const handleSearchChange = (e) => {
    const newFilters = {
      ...filters,
      search: e.target.value
    };
    setFilters(newFilters);
    // Debounce search
    setTimeout(() => {
      loadTasks(newFilters);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <Container maxWidth="xl" className="py-8">
        {/* Statistics */}
        <Grid container spacing={3} className="mb-6">
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Tasks"
              value={stats?.totalTasks || 0}
              icon={<WorkOutline />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending"
              value={stats?.pending || 0}
              icon={<PendingActions />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="In Progress"
              value={stats?.inProgress || 0}
              icon={<WorkOutline />}
              color="info"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Completed"
              value={stats?.completed || 0}
              icon={<CheckCircle />}
              color="success"
            />
          </Grid>
        </Grid>

        {/* Filters and Actions */}
        <Paper className="p-4 mb-6">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                placeholder="Search tasks..."
                name="search"
                value={filters.search}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <Search className="mr-2 text-gray-400" />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  label="Category"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Urgent">Urgent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  label="Status"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5} className="text-right">
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => {
                  setSelectedTask(null);
                  setModalOpen(true);
                }}
                size="large"
              >
                Create Task
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Task List */}
        {loading ? (
          <Box className="flex justify-center py-10">
            <div className="loading-spinner"></div>
          </Box>
        ) : tasks.length === 0 ? (
          <Paper className="p-10 text-center">
            <Typography variant="h6" color="textSecondary">
              No tasks found. Create your first task!
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {tasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task._id}>
                <TaskCard
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Task Modal */}
      <TaskModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedTask(null);
        }}
        onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
        task={selectedTask}
        loading={loading}
      />
    </div>
  );
};

export default Dashboard;
