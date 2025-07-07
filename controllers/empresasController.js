const Empresa = require('../models/Empresa');

exports.getEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.findAll();
        res.json(empresas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createEmpresa = async (req, res) => {
    try {
        const { nombre, telefono, direccion } = req.body;
        const empresa = await Empresa.create({ nombre, telefono, direccion });
        res.status(201).json(empresa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};