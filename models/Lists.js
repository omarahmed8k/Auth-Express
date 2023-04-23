const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ListsSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Lists = mongoose.model('Lists', ListsSchema);