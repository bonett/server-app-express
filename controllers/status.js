const Status = require('../models/status');

module.exports = {

    index: async (req, res, next) => {

        const result = await Status.find();
        
        try {
            res.json(result);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    newStatus: async (req, res, next) => {

        const newStatus = new Status(req.body)
        const status = await newStatus.save();

        try {
            res.status(201).json(status);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    showStatus: async (req, res, next) => {

        const { statusId } = req.params;
        const status = await Status.findById(statusId)

        try {
            if (status == null) {
                return res.status(404).json({ message: 'Cannot find status' });
            } else {
                res.json(status);
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    updateStatus: async (req, res, next) => {

        const { statusId } = req.params;
        const newStatus = req.body;
        await Status.findByIdAndUpdate(statusId, newStatus);

        try {
            res.json(newStaff);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    removeStatus: async (req, res, next) => {

        const { statusId } = req.params;

        const status = await Status.findById(statusId);

        try {
            if (status == null) {
                return res.status(404).json({ message: 'Cannot find status' });
            } else {
                await Status.findByIdAndRemove(statusId);
                res.json({ message: "Deleted status" });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}