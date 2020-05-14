const express = require('express');
const router = express.Router();
const Specialty = require('../models/specialty');
const SpecialtyController = require('../controllers/specialty')

// Gettting all
router.route('/')
    .get(SpecialtyController.index)
    .post(SpecialtyController.newSpecialty);

// Gettting One
router.get('/:id', getSpecialty, (req, res) => {
    res.json(res.specialty);
});

// Creating one
router.post('/', async (req, res) => {
    
});

// Updating one
router.patch('/:id', getSpecialty, async (req, res) => {
    if (req.body.name != null) {
        res.specialty.name = req.body.name;
        res.specialty.updatedBy = req.body.updatedBy;
        res.specialty.createdBy = req.body.createdBy;
    }

    try {
        const updateSpecialty = await res.specialty.save();
        res.json(updateSpecialty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting one
router.delete('/:id', getSpecialty, async (req, res) => {
    try {
        await res.specialty.remove()
        res.json({ message: "Deleted Specialty" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getSpecialty(req, res, next) {

    let specialty;

    try {
        specialty = await Specialty.findById(req.params.id)
        if (specialty == null) {
            return res.status(404).json({ message: 'Cannot find specialty' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.specialty = specialty;
    next();
};

module.exports = router;