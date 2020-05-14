const mongoose = require('mongoose');
const Schema = mongoose.Schema;;
const Speciality = require('../models/speciality');

const providerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    speciality: {
        type: Schema.ObjectId,
        ref: "Speciality"
    },
    projectedStartDate: {
        type: Date,
    },
    providerType: {
        type: String 
    },
    staffStatus: {
        type: String,
    },
    status: {
        type: String,
        default: 'AWATING_CREDENTIALS'
    },
    photo: {
        path: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Provider', providerSchema)