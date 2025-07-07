const Locker = require('../models/Locker');

exports.getLockers = async (req, res) => {
    try {
        const lockers = await Locker.findAll({ include: ['empresa'] });
        res.json(lockers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createLocker = async (req, res) => {
    try {
        const { identificador, ubicacion, estado, tipo, empresa_id } = req.body;
        const locker = await Locker.create({ identificador, ubicacion, estado, tipo, empresa_id });
        res.status(201).json(locker);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};