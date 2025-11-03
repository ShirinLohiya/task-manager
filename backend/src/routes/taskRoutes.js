const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getMyStats
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { upload, handleMulterError } = require('../middleware/upload');

// All routes are protected
router.use(protect);

router.get('/stats/me', getMyStats);
router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', upload.single('attachment'), handleMulterError, createTask);
router.put('/:id', upload.single('attachment'), handleMulterError, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
