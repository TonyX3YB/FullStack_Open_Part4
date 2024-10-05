// controllers/users.js
import bcrypt from 'bcrypt';
import express from 'express';
import User from '../models/user.js'; // Adjust path if necessary

const usersRouter = express.Router();

// Route to get all users
usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to create a new user
usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  if (!password || password.length < 3) {
    return res.status(400).json({ error: 'Password must be at least 3 characters long' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default usersRouter;
