const Plan = require('../models/Plan');

exports.getPlanes = async (req, res) => {
    try {
        const planes = await Plan.findAll();
        res.json(planes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createPlan = async (req, res) => {
    try {
        const { nombre, limite_usuarios, costo } = req.body;
        const plan = await Plan.create({ nombre, limite_usuarios, costo });
        res.status(201).json(plan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
