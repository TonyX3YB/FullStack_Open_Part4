const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

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

// Endpoint to get all users (optional)
usersRouter.get('/', async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

module.exports = usersRouter;
