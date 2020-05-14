const Staff = require('../models/staff');

module.exports = {

    index: async (req, res, next) => {

        const result = await Staff.find();
        
        try {
            res.json(result);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    newStaff: async (req, res, next) => {

        const newStaff = new Staff(req.body)
        const staff = await newStaff.save();

        try {
            res.status(201).json(staff);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    showStaff: async (req, res, next) => {

        const { staffId } = req.params;
        const staff = await Staff.findById(staffId)

        try {
            if (staff == null) {
                return res.status(404).json({ message: 'Cannot find staff' });
            } else {
                res.json(staff);
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    updateStaff: async (req, res, next) => {

        const { staffId } = req.params;
        const newStaff = req.body;
        await Staff.findByIdAndUpdate(staffId, newStaff);

        try {
            res.json(newStaff);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    removeStaff: async (req, res, next) => {

        const { staffId } = req.params;

        const staff = await Staff.findById(staffId);

        try {
            if (staff == null) {
                return res.status(404).json({ message: 'Cannot find staff' });
            } else {
                await Staff.findByIdAndRemove(staffId);
                res.json({ message: "Deleted staff" });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}