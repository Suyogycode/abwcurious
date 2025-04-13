// src/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const learningRoutes = require('./routes/learning');
const resourceRoutes = require('./routes/resources');
const quizRoutes = require('./routes/quiz');
const tutorRoutes = require('./routes/tutor');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/tutor', tutorRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// src/models/User.js
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  class: Number,
  subjects: [String],
  interests: [String],
  progress: {
    studyStreak: { type: Number, default: 0 },
    totalHours: { type: Number, default: 0 },
    quizzesTaken: { type: Number, default: 0 }
  },
  achievements: [{
    title: String,
    description: String,
    dateEarned: Date
  }]
});

// src/models/Topic.js
const topicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  content: String,
  videoUrl: String,
  arExperience: String,
  resources: [{
    type: String,
    title: String,
    url: String
  }]
});

// src/models/Quiz.js
const quizSchema = new mongoose.Schema({
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    explanation: String
  }]
});

// src/models/Progress.js
const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  completed: { type: Boolean, default: false },
  quizScore: Number,
  timeSpent: Number,
  lastAccessed: Date
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Topic: mongoose.model('Topic', topicSchema),
  Quiz: mongoose.model('Quiz', quizSchema),
  Progress: mongoose.model('Progress', progressSchema)
};
