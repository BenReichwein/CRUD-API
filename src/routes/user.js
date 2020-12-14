// Imports
const sanitize = require('mongo-sanitize');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const redis = require('redis');
const client = redis.createClient({
  url: "redis://redis-19193.c14.us-east-1-2.ec2.cloud.redislabs.com:19193",
  password: "QcOi1cReoY9uWJPIlkJqLI8cgN5dBNNL",
});
const { promisify } = require('util');
const hgetAsync = promisify(client.hget).bind(client);
const hsetAsync = promisify(client.hset).bind(client);
const hdelAsync = promisify(client.hdel).bind(client);
// Model
const User = require("../models/User");

const user = (app) => {
    // =======
    // Sign up
    // =======
    app.post('/user/signup', async (req, res) => {
      // Error Handling
      if (
        !req.body.email ||
        !req.body.username ||
        !req.body.password
      )
        return res.status(400).json({
          err: 'Email, Username or Password not provided',
        });

      if (
        !req.body.email.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      )
        return res.status(422).json({ err: 'Email format is not valid' });

      const userEmail = await User.findOne({
        email: sanitize(req.body.email),
      }).exec();

      if (userEmail)
        return res
          .status(422)
          .json({ err: 'Email already in use by another account' });

      const userUsername = await User.findOne({
        username: sanitize(req.body.username),
      }).exec();

      if (userUsername)
        return res
          .status(422)
          .json({ err: 'Username already in use by another account' });

      await new User({
        email: sanitize(req.body.email),
        username: sanitize(req.body.username),
        password: await bcrypt.hash(req.body.password, 10),
      }).save();

      return res.status(201).json();
    });
    // =====
    // Login
    // =====
    app.post('/user/login', async (req, res) => {
      // Error Handling
      if (!req.body.emailUsername || !req.body.password)
        return res
          .status(400)
          .json({ err: 'Email, Username or Password not provided' });

      const user = await User.findOne({
        $or: [
          { email: sanitize(req.body.emailUsername) },
          { username: sanitize(req.body.emailUsername) },
        ],
      }).exec();

      if (!user)
        return res
          .status(404)
          .json({ err: 'No user with such email or username found' });

      if (!bcrypt.compare(req.body.password, user.password))
        return res.status(422).json({ err: 'Invalid password' });

      const token = crypto.randomBytes(64).toString('hex');

      await hsetAsync('access_tokens', token, user.id);

      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        accessToken: token,
      });
    });
    // ===========
    // Update user
    // ===========
    app.patch('/user/:id', async (req, res) => {
      const updateQuery = {};

      if (req.body.username) updateQuery.username = req.body.username;
      if (req.body.email) updateQuery.email = req.body.email;
      if (req.body.password)
        updateQuery.password = await bcrypt.hash(req.body.password, 10);
      if (req.body.bio) updateQuery.bio = req.body.bio;

      return res.status(201).json({ user });
    });
    // =============
    // Get user info
    // =============
    app.get('/user/:userID', async (req, res) => {
      const user = await User.findById(req.params.userID);
  
      if (!user) return res.status(404).json({ err: 'User not found' });
  
      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      });
    });
    // ======
    // Logout
    // ======
    app.post('/user/logout', async (req, res) => {
      await hdelAsync('access_tokens', req['access_token']);
  
      return res.status(200).json();
    });
  
};

module.exports = user;