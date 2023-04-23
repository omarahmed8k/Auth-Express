const Lists = require('../models/Lists');

exports.createList = (req, res) => {
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
}

exports.getLists = (req, res) => {
    Lists.find({ ownerId: req.query.user })
        .then(lists => res.json(lists))
        .catch(err => res.status(400).json({ msg: "Error" }));
}

exports.getListById = (req, res) => {
    Lists.findById(req.params.id)
        .then(list => res.json(list))
        .catch(err => res.status(400).json({ msg: "Error" }));
}

exports.updateList = (req, res) => {
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
}

exports.deleteList = (req, res) => {
    Lists.findByIdAndDelete(req.params.id)
        .then(list => {
            res.json({
                success: true,
            })
        }).catch(err => res.status(400).json({ msg: "Error" }));
}

