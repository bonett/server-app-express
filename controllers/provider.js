const Provider = require('../models/provider');
const Specialty = require('../models/specialty');
const Status = require('../models/status');
const Staff = require('../models/staff');
const Types = require('../models/type');

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
        const provider = await Types.findOne({ name: params.providerType });
        const status = await Status.findOne({ name: params.status });
        const staff = await Staff.findOne({ name: params.staffStatus });
        const getSpecialty = await Specialty.findById(specialtyId);
        const projectedStart = new Date(params.projectedStartDate);
        const currentDate = new Date();
        let providerStatus = "";

        if (projectedStart > currentDate) {
            providerStatus = "DONE";
        }

        if (projectedStart <= currentDate) {
            providerStatus = "PENDING";
        }

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
            photo: req.body.photo,
            providerStatus: providerStatus
        });

        try {
            if (provider.name == null || staff.name == null || status.name == null) {
                res.status(400).json({ message: 'Bad request, payload error' });
            } else {
                await newProvider.save();
                res.status(201).json(newProvider);
            }
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
            photo: provider.photo,
            providerStatus: provider.providerStatus
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
        const currentProvider = await Provider.findById(providerId);
        const newProvider = req.body;
        const type = await Types.findOne({ name: newProvider.providerType });
        const status = await Status.findOne({ name: newProvider.status });
        const staff = await Staff.findOne({ name: newProvider.staffStatus });

        try {
            if (currentProvider != null) {
                if (type.name == null || staff.name == null || status.name == null) {
                    res.status(400).json({ message: err.message });
                } else {
                    await Provider.findByIdAndUpdate(providerId, newProvider);
                    res.json(newProvider);
                }
            } else {
                res.status(400).json({ message: 'Cannot find provider' });
            }
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