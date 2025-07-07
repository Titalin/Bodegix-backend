const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.getUsuarios);
router.post('/', usuariosController.createUsuario);
router.post('/login', usuariosController.loginUsuario);
module.exports = router;
