const express = require('express');
const router = express.Router();
const planesController = require('../controllers/planesController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, planesController.getPlanes);
router.post('/', auth, planesController.createPlan);
module.exports = router;