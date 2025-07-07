const Suscripcion = require('../models/Suscripcion');

exports.getSuscripciones = async (req, res) => {
    try {
        const suscripciones = await Suscripcion.findAll({ include: ['empresa', 'plan'] });
        res.json(suscripciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createSuscripcion = async (req, res) => {
    try {
        const { empresa_id, plan_id, fecha_inicio, fecha_fin, estado } = req.body;
        const suscripcion = await Suscripcion.create({ empresa_id, plan_id, fecha_inicio, fecha_fin, estado });
        res.status(201).json(suscripcion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};