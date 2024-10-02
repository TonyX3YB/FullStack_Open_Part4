// routes/users.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const usersRouter = express.Router();

// Endpoint for creating new users
usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Hash the password with bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
});

// Endpoint to get all users and embed their blogs
usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', {
        title: 1,
        author: 1,
        url: 1,
        likes: 1,
    });
    res.json(users);
});

module.exports = usersRouter;
