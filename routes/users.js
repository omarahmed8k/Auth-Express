const express = require('express');
const router = new express.Router();
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// User model
const User = require('../models/User');

// Login and Register routes
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });

            const newUser = new User({
                name,
                email,
                password
            });

            // Create salt and hash
            bycrypt.genSalt(10, (err, salt) => {
                bycrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            )
                        });
                });
            });
        }).catch(err => res.status(400).json({ msg: "Error" }));
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' });

            // Validate password
            bycrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                })
        }).catch(err => res.status(400).json({ msg: "Error" }));
});

module.exports = router;