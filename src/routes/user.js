const express = require('express');
const User = require('../models/user');

const router = express.Router();
const USER_NOT_FOUND = 'User not found';

router.get('/', async (req, res) => {
  try {
    const users = await User.find(req.query);

    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send(USER_NOT_FOUND);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const unsavedUser = new User(req.body);
    const user = await unsavedUser.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send(USER_NOT_FOUND);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id, req.body);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send(USER_NOT_FOUND);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
