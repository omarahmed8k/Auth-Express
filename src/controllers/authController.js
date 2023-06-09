const User = require('../models/User');
const bycrypt = require('bcryptjs');

exports.login = (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' });

            bycrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                res.json({
                    success: true,
                    access: true,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                })
            })
        }).catch(err => res.status(400).json({ msg: "Error" }));
}

exports.register = (req, res) => {
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

            bycrypt.genSalt(10, (err, salt) => {
                bycrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            res.json({
                                success: true,
                                access: true,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }).catch(err => res.status(400).json({ msg: "Error" }));
                })
            })
        }).catch(err => res.status(400).json({ msg: "Error" }));
}