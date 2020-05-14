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
        const specialty = await Specialty.findOne(specialtyId)

        try {
            res.json(specialty);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    updateSpecialty: async (req, res, next) => {

        const { specialtyId } = req.params;
        const newSpecialty = new Specialty(req.body);
        const result = await Specialty.findByIdAndUpdate(specialtyId, newSpecialty);

        try {
            res.json(newSpecialty);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    removeSpecialty: async (req, res, next) => {

        const { specialtyId } = req.params;
        const specialty = await Specialty.findOneAndRemove(specialtyId);

        try {
            res.json({ message: "Deleted Specialty" });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}