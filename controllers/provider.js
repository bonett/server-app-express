const Provider = require('../models/provider');
const Specialty = require('../models/specialty');

module.exports = {

    index: async (req, res, next) => {
        const Providers = await Provider.find();
        try {
            res.json(Providers);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    newProvider: async (req, res, next) => {
        const newSpecialty = new Specialty(req.body)
        const specialty = await newSpecialty.save();
        try {
            res.status(201).json(specialty);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    showProvider: async (req, res, next) => {

        const { providerId } = req.params;
        const provider = await Provider.findById(providerId)

        try {
            if (provider == null) {
                return res.status(404).json({ message: 'Cannot find provider' });
            } else {
                res.json(provider);
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    updateProvider: async (req, res, next) => {

        const { specialtyId } = req.params.id;
        const newSpecialty = new Specialty(req.body);
        const result = await Specialty.findByIdAndUpdate(specialtyId, newSpecialty);

        try {
            res.json(newSpecialty);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    removeProvider: async (req, res, next) => {

        const { providerId } = req.params;

        const provider = await Provider.findById(providerId);

        try {
            if (provider == null) {
                return res.status(404).json({ message: 'Cannot find provider' });
            } else {
                await Provider.findByIdAndRemove(providerId);
                res.json({ message: "Deleted provider" });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}