const mongoose = require('mongoose')

const specialtySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: Number,
        required: true
    },
    updatedBy: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Specialty', specialtySchema)