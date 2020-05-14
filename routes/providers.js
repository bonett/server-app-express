const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Provider = require('../models/provider');
const Specialty = require('../models/specialty');

// Gettting all
router.get('/', async (req, res) => {
    try {
        const providers = await Provider.find();
        res.json(providers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Gettting One
router.get('/:id', getProvider, (req, res) => {
    res.json(res.provider);
});

// Creating one
router.post('/', async (req, res) => {

    const specialtyProvider = new Specialty({
        _id: new mongoose.Types.ObjectId()
    });
    
    const provider = new Provider({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleName: req.body.middleName,
        email: req.body.email,
        specialty: specialtyProvider,
        projectedStartDate: req.body.projectedStartDate,
        employerId: req.body.employerId,
        providerType: req.body.providerType,
        staffStatus: req.body.staffStatus,
        status: req.body.status,
        createdBy: req.body.createdBy,
        updatedBy: req.body.updatedBy,
        photo: req.body.photo
    });

    try {
        const newProvider = await provider.save();
        res.status(201).json(newProvider);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating one
router.patch('/:id', getProvider, async (req, res) => {

    if (req.body.firstName != null) {
        res.provider.firstName = req.body.firstName;
        res.provider.lastName = req.body.lastName;
        res.provider.middleName = req.body.middleName;
        res.provider.email = req.body.email;
        res.provider.specialty = req.body.specialty;
        res.provider.projectedStartDate = req.body.projectedStartDate;
        res.provider.employerId = req.body.employerId;
        res.provider.providerType = req.body.providerType;
        res.provider.staffStatus = req.body.staffStatus;
        res.provider.status = req.body.status;
        res.provider.createdBy = req.body.createdBy;
        res.provider.updatedBy = req.body.updatedBy;
        res.provider.photo = req.body.photo;
    }

    try {
        const updateProvider = await res.provider.save();
        res.json(updateProvider);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Deleting one
router.delete('/:id', getProvider, async (req, res) => {
    try {
        await res.provider.remove()
        res.json({ message: "Deleted Provider" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getProvider(req, res, next) {

    let provider;

    try {
        provider = await Provider.findById(req.params.id);
        if (provider == null) {
            return res.status(404).json({ message: 'Cannot find provider' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.provider = provider;
    next();
};

module.exports = router;