const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Provider = require('../models/provider');
const Speciality = require('../models/speciality');

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

    const speciality = new Speciality({
        _id: new mongoose.Types.ObjectId()
      });

    const provider = new Provider({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        middleName: req.body.middleName,
        email: req.body.email,
        speciality: speciality,
        projectedStartDate: req.body.projectedStartDate,
        employerId: req.body.employerId,
        providerType: req.body.providerType,
        staffStatus: req.body.staffStatus,
        status: "READY_FOR_REVIEW",
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

// Deleting one
router.delete('/:id', getProvider, async (req, res) => {
    try {
        await res.provider.remove()
        res.json({ message: "Deleted Provider" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getSpeciality(req, res, next) {

    let speciality;

    try {
        speciality = await Speciality.findById(req.params.speciality);
        if (provider == null) {
            return res.status(404).json({ message: 'Cannot find speciality' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.provider = provider;
    next();
};

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