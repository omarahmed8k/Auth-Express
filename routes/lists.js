const express = require('express');
const router = new express.Router();

// Lists model
const Lists = require('../models/Lists');

// Lists Create API
router.post('', (req, res) => {
    const { description, ownerId } = req.body;

    // Simple validation
    if (!description || !ownerId) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const newList = new Lists({ description, ownerId });
    newList.save().then(list => {
        res.json({
            success: true,
            list: {
                id: list.id,
                ownerId: list.ownerId,
                description: list.description,
            }
        })
    }).catch(err => res.status(400).json({ msg: "Error" }));

})

// Lists Get API by user
router.get('', (req, res) => {
    Lists.find({ ownerId: req.query.user })
        .then(lists => res.json(lists))
        .catch(err => res.status(400).json({ msg: "Error" }));
});

// Lists Get by ID API
router.get('/:id', (req, res) => {
    Lists.findById(req.params.id)
        .then(list => res.json(list))
        .catch(err => res.status(400).json({ msg: "Error" }));
});

// Lists Update API
router.patch('/:id', (req, res) => {
    const { description } = req.body;

    // Simple validation
    if (!description) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    Lists.findByIdAndUpdate(req.params.id, { description }, { new: true })
        .then(list => {
            res.json({
                success: true,
                list: {
                    id: list.id,
                    ownerId: list.ownerId,
                    description: list.description,
                }
            })
        }).catch(err => res.status(400).json({ msg: "Error" }));

})

// Lists Delete API
router.delete('/:id', (req, res) => {
    Lists.findByIdAndDelete(req.params.id)
        .then(list => {
            res.json({
                success: true,
            })
        }).catch(err => res.status(400).json({ msg: "Error" }));
})

module.exports = router;