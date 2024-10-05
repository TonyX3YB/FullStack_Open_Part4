import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Make sure you import your user model
import express from 'express';

const loginRouter = express.Router();

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  // Find user by username
  const user = await User.findOne({ username });
  const passwordCorrect = user === null 
    ? false 
    : await bcrypt.compare(password, user.passwordHash); // Use bcrypt to compare password with hash

  // If user or password is incorrect, send a 401 error
  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' });
  }

  // If username and password are correct, create a token
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' });

  // Send the token and user info as a response
  response.status(200).send({ token, username: user.username, name: user.name });
});

export default loginRouter;
