const express = require('express');
const router = express.Router();

const { check } = require('express-validator'); // We'll add this dependency
const {handleUserSignUp, handleUserLogin} = require('../controller/userController');

// @route   POST /api/auth/register
// @desc    Register a new user
const registerValidation = [
  check('firstname', 'Firstname is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
];
const loginValidation = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ];


router.post('/signup', registerValidation, handleUserSignUp );

router.post('/login', loginValidation, handleUserLogin );

module.exports = router;
