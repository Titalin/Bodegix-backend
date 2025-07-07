const express = require('express');
const router = express.Router();
const lockersController = require('../controllers/lockersController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, lockersController.getLockers);
router.post('/', auth, lockersController.createLocker);
module.exports = router;