const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    specialty: {
        type: Schema.ObjectId,
        ref: "Specialty"
    },
    employerId: {
        type: Number,
    },
    projectedStartDate: {
        type: Date,
    },
    providerType: {
        type: Schema.ObjectId,
        ref: "Type"
    },
    staffStatus: {
        type: Schema.ObjectId,
        ref: "Staff"
    },
    status: {
        type: Schema.ObjectId,
        ref: "Status"
    },
    assignedTo: {
        type: String
    },
    createdBy: {
        type: Number
    },
    updatedBy: {
        type: Number
    },
    photo: {
        type: String
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Provider', providerSchema)