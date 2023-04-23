const express = require('express');
const router = new express.Router();
const { getUser } = require('../controllers/userController.js');

// Get User API
router.get('/:id', (req, res) => {
    getUser(req, res);
});

module.exports = router;