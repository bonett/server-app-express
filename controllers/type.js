const Type = require('../models/type');

module.exports = {

    index: async (req, res, next) => {

        const result = await Type.find();

        try {
            res.json(result);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    newType: async (req, res, next) => {

        const newType = new Type(req.body)
        const type = await newType.save();

        try {
            res.status(201).json(type);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    showType: async (req, res, next) => {

        const { typeId } = req.params;
        const type = await Type.findById(typeId)

        try {
            if (type == null) {
                return res.status(404).json({ message: 'Cannot find Type' });
            } else {
                res.json(type);
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    updateType: async (req, res, next) => {

        const { typeId } = req.params;
        const newType = new Type(req.body);
        const result = await Type.findByIdAndUpdate(typeId, newType);

        try {
            res.json(newType);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    removeType: async (req, res, next) => {

        const { typeId } = req.params;

        const type = await Type.findById(typeId);

        try {
            if (type == null) {
                return res.status(404).json({ message: 'Cannot find Type' });
            } else {
                await Type.findByIdAndRemove(typeId);
                res.json({ message: "Deleted Type" });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}