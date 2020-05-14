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

        const params = req.body;
        const specialtyId = params.specialty;
        const getSpecialty = await Specialty.findById(specialtyId);

        const newProvider = new Provider({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            email: req.body.email,
            specialty: getSpecialty,
            projectedStartDate: req.body.projectedStartDate,
            employerId: req.body.employerId,
            providerType: req.body.providerType,
            staffStatus: req.body.staffStatus,
            status: req.body.status,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            photo: req.body.photo
        });

        await newProvider.save();

        try {
            res.status(201).json(newProvider);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    showProvider: async (req, res, next) => {

        const { providerId } = req.params;
        const provider = await Provider.findById(providerId);
        const specialtyId = provider.specialty;
        const getSpecialty = await Specialty.findById(specialtyId);

        const newProvider = new Provider({
            firstName: provider.firstName,
            lastName: provider.lastName,
            middleName: provider.middleName,
            email: provider.email,
            specialty: getSpecialty,
            projectedStartDate: provider.projectedStartDate,
            employerId: provider.employerId,
            providerType: provider.providerType,
            staffStatus: provider.staffStatus,
            status: provider.status,
            createdBy: provider.createdBy,
            updatedBy: provider.updatedBy,
            photo: provider.photo
        });

        try {
            if (provider == null) {
                return res.status(404).json({ message: 'Cannot find provider' });
            } else {
                res.json(newProvider);
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    updateProvider: async (req, res, next) => {

        const { providerId } = req.params;
        const newProvider = new Provider(req.body);
        await Provider.findByIdAndUpdate(providerId, newProvider);

        try {
            res.json(newProvider);
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