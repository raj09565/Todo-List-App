import { Router } from 'express';
import Task from '../models/Task.js';

const router = Router();

// POST /api/tasks -> create task
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Task text is required' });
    }
    const task = await Task.create({ text: text.trim() });
    return res.status(201).json(task);
  } catch (err) {
    console.error('Create task error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/tasks -> list tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    return res.json(tasks);
  } catch (err) {
    console.error('Get tasks error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/tasks/:id -> update task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};

    if (typeof req.body.text === 'string') {
      if (!req.body.text.trim()) {
        return res.status(400).json({ message: 'Task text cannot be empty' });
      }
      updates.text = req.body.text.trim();
    }

    if (typeof req.body.completed === 'boolean') {
      updates.completed = req.body.completed;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    return res.json(task);
  } catch (err) {
    console.error('Update task error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/tasks/:id -> delete task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    return res.json({ message: 'Task deleted', id });
  } catch (err) {
    console.error('Delete task error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
