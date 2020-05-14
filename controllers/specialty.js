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

    newSpecialty: async (req, res, next) =>{
        const newSpecialty = new Specialty(req.body)
        const specialty = await newSpecialty.save();
        try {
            res.status(201).json(specialty);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}