const express = require('express');
const router = express.Router();
const Speciality = require('../models/speciality');

// Gettting all
router.get('/', async (req, res) => {
    try {
        const specialities = await Speciality.find();
        res.json(specialities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Gettting One
router.get('/:id', getSpeciality, (req, res) => {
    res.json(res.speciality);
});

// Creating one
router.post('/', async (req, res) => {
    const speciality = new Speciality({
        name: req.body.name,
        updatedBy: req.body.updatedBy,
        createdBy: req.body.createdBy
    })

    try {
        const newSpeciality = await speciality.save();
        res.status(201).json(newSpeciality);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating one
router.patch('/:id', getSpeciality, async (req, res) => {
    if (req.body.name != null) {
        res.speciality.name = req.body.name;
        res.speciality.updatedBy = req.body.updatedBy;
        res.speciality.createdBy = req.body.createdBy;
    }

    try {
        const updateSpeciality = await res.speciality.save();
        res.json(updateSpeciality);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting one
router.delete('/:id', getSpeciality, async (req, res) => {
    try {
        await res.speciality.remove()
        res.json({ message: "Deleted Speciality" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getSpeciality(req, res, next) {

    let speciality;

    try {
        speciality = await Speciality.findById(req.params.id)
        if (speciality == null) {
            return res.status(404).json({ message: 'Cannot find speciality' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.speciality = speciality;
    next();
};

module.exports = router;