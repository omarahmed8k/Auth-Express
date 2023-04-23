const express = require('express');
const router = new express.Router();
const { register, login } = require('../controllers/authController.js');

// Register API
router.post('/register', (req, res) => {
    register(req, res);
});

// Login API
router.post('/login', (req, res) => {
    login(req, res);
});

module.exports = router;