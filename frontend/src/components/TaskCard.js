import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Box
} from '@mui/material';
import { Edit, Delete, AttachFile } from '@mui/icons-material';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Personal':
        return 'primary';
      case 'Work':
        return 'secondary';
      case 'Urgent':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'pending':
        return 'default';
      default:
        return 'default';
    }
  };

  const formatDate = (date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent>
        <Box className="flex justify-between items-start mb-2">
          <Typography variant="h6" component="div" className="font-semibold">
            {task.title}
          </Typography>
          <Box className="flex gap-1">
            <Chip
              label={task.category}
              color={getCategoryColor(task.category)}
              size="small"
            />
            <Chip
              label={task.status}
              color={getStatusColor(task.status)}
              size="small"
            />
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" className="mb-2">
          {task.description || 'No description provided'}
        </Typography>

        <Box className="flex items-center gap-2 mt-2">
          <Chip
            label={`Priority: ${task.priority}`}
            size="small"
            variant="outlined"
          />
          <Typography variant="caption" color="text.secondary">
            Due: {formatDate(task.dueDate)}
          </Typography>
          {task.attachment && (
            <AttachFile fontSize="small" color="action" />
          )}
        </Box>
      </CardContent>

      <CardActions className="flex justify-end">
        <IconButton
          size="small"
          color="primary"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          <Edit />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => onDelete(task._id)}
          title="Delete task"
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
