const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { validationResult } = require('express-validator'); // We'll add this dependency

const createToken = (user) => {
  const payload = { userId: user._id, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};


async function handleUserSignUp(req, res){
    //1. check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //2. Check if user already exists
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ message: 'User with this email already exists', success: false });
        }

        //3. encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10 );
        req.body.password = hashedPassword;

        //4. create a new user in the database
        const newUser = new User(req.body);
        await newUser.save();

        //5. Generate JWT token
        const token = createToken(newUser);
        return res.status(201).json({
            message: 'User registered successfully',
            success: true,
            token
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


async function handleUserLogin(req, res) {
    //1. check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //2. if user is not registered, then return an error
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if(!user){
            return res.json({
                message: 'User not found',
                success: false,
            });
        }
        //3. if user is registered, then check for password match
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
            return res.json({
                message: 'Invalid password',
                success: false,
            });
        }

      const token = createToken(user);

      return res.status(200).json({
        message: 'User Logged In successfully',
        success: true,
        token
    });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
};

module.exports = {
    handleUserSignUp,
    handleUserLogin
};
