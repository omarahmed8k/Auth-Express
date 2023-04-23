const User = require('../models/User');
const Lists = require('../models/Lists');

exports.getUser = (req, res) => {
    User.findById(req.params.id).then(user => {
        Lists.find({ ownerId: user._id }).then(
            lists => {
                res.json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    lists: lists.length
                })
            }
        )
    })
}
