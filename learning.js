// src/routes/learning.js
const express = require('express');
const auth = require('../middleware/auth');
const { Topic, Progress, User } = require('../models');
const router = express.Router();

// Get all topics for a subject
router.get('/topics/:subject', auth, async (req, res) => {
  try {
    const topics = await Topic.find({ subject: req.params.subject });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching topics' });
  }
});

// Get topic details
router.get('/topic/:id', auth, async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching topic' });
  }
});

// Update user progress
router.post('/progress', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming `progress` is part of the request body
    const { progress } = req.body;
    user.progress = progress;

    await user.save();

    res.json({ message: 'Progress updated successfully', progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating progress' });
  }
});

// Get user progress for all topics
router.get('/progress', auth, async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.id }).populate('topic');
    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching progress' });
  }
});

module.exports = router;