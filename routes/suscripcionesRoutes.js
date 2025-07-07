const express = require('express');
const router = express.Router();
const suscripcionesController = require('../controllers/suscripcionesController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, suscripcionesController.getSuscripciones);
router.post('/', auth, suscripcionesController.createSuscripcion);
module.exports = router;