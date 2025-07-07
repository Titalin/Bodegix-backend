const express = require('express');
const router = express.Router();
const empresasController = require('../controllers/empresasController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, empresasController.getEmpresas);
router.post('/', auth, empresasController.createEmpresa);
module.exports = router;