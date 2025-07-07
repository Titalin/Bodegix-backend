// controllers/usuarioController.js
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['contraseña'] }, // evitar exponer contraseñas
            include: ['rol', 'empresa']
        });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUsuario = async (req, res) => {
    try {
        const { nombre, correo, contraseña, rol_id, empresa_id } = req.body;

        if (!nombre || !correo || !contraseña || !rol_id || !empresa_id) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const usuarioExistente = await Usuario.findOne({ where: { correo } });
        if (usuarioExistente) {
            return res.status(409).json({ error: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña antes de guardarla
        const hash = await bcrypt.hash(contraseña, 10);

        const usuario = await Usuario.create({
            nombre,
            correo,
            contraseña: hash,
            rol_id,
            empresa_id
        });

        const { contraseña: _, ...usuarioSinContraseña } = usuario.toJSON();
        res.status(201).json(usuarioSinContraseña);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUsuario = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        if (!correo || !contraseña) {
            return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
        }

        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Comparar la contraseña ingresada con el hash almacenado
        const match = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!match) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: usuario.id, rol_id: usuario.rol_id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        const { contraseña: _, ...usuarioSinContraseña } = usuario.toJSON();
        res.json({ token, usuario: usuarioSinContraseña });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
