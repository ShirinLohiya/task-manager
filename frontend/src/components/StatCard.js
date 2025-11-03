import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const StatCard = ({ title, value, icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-purple-500'
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent>
        <Box className="flex items-center justify-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div" className="font-bold">
              {value}
            </Typography>
          </Box>
          <Box className={`${colorClasses[color]} p-3 rounded-full text-white`}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
