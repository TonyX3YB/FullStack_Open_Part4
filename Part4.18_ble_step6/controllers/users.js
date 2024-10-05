const bcrypt = require('bcrypt');
const User = require('../models/user');

const createUser = async (req, res) => {
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

  const savedUser = await user.save();
  res.status(201).json(savedUser);
};

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

module.exports = { createUser, getUsers };

target:
social:
rec:
ad:
url:
listing:
name:
hash:
synn:
pass:
likes:
blogs:










