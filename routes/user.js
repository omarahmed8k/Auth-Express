const express = require('express');
const router = new express.Router();

// User model
const User = require('../models/User');

// Get User API
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ msg: "Error" }));
});

module.exports = router;