const Locker = require('../models/Locker');

exports.getLockers = async (req, res) => {
    try {
        const lockers = await Locker.findAll({ include: ['empresa'] });
        res.json(lockers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLockers = async (req, res) => {
    try {
        const { empresa_id } = req.query;
        const whereClause = empresa_id ? { empresa_id } : {};

        const lockers = await Locker.findAll({
            where: whereClause,
            include: ['empresa']
        });

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

exports.updateLocker = async (req, res) => {
    try {
        const { id } = req.params;
        const { identificador, ubicacion, estado, tipo, empresa_id, usuario_id } = req.body;

        const locker = await Locker.findByPk(id);
        if (!locker) {
            return res.status(404).json({ error: 'Locker no encontrado' });
        }

        locker.identificador = identificador ?? locker.identificador;
        locker.ubicacion = ubicacion ?? locker.ubicacion;
        locker.estado = estado ?? locker.estado;
        locker.tipo = tipo ?? locker.tipo;
        locker.empresa_id = empresa_id ?? locker.empresa_id;
        locker.usuario_id = usuario_id ?? locker.usuario_id;

        await locker.save();

        res.json(locker);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteLocker = async (req, res) => {
    try {
        const { id } = req.params;

        const locker = await Locker.findByPk(id);
        if (!locker) {
            return res.status(404).json({ error: 'Locker no encontrado' });
        }

        await locker.destroy();

        res.json({ message: 'Locker eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
