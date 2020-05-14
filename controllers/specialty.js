const Specialty = require('../models/specialty');

module.exports = {

    index: async (req, res, next) => {

        const specialties = await Specialty.find();

        try {
            res.json(specialties);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    newSpecialty: async (req, res, next) => {

        const newSpecialty = new Specialty(req.body)
        const specialty = await newSpecialty.save();

        try {
            res.status(201).json(specialty);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    showSpecialty: async (req, res, next) => {

        const { specialtyId } = req.params;
        const specialty = await Specialty.findById(specialtyId);

        try {
            if (specialty == null) {
                return res.status(404).json({ message: 'Cannot find specialty' });
            } else {
                res.json(specialty);
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    updateSpecialty: async (req, res, next) => {

        const { specialtyId } = req.params;
        const specialty = await Specialty.findById(specialtyId);
        const newSpecialty = req.body;

        try {
            if (specialty == null) {
                res.status(400).json({ message: err.message });
            } else {
                await Specialty.findByIdAndUpdate(specialtyId, newSpecialty);
                res.json(newSpecialty);
            }

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    removeSpecialty: async (req, res, next) => {

        const { specialtyId } = req.params;

        const specialty = await Specialty.findById(specialtyId);

        try {
            if (specialty == null) {
                return res.status(404).json({ message: 'Cannot find specialty' });
            } else {
                await Specialty.findByIdAndRemove(specialtyId);
                res.json({ message: "Deleted Specialty" });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}