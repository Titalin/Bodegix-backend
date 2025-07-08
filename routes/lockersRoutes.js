const express = require('express');
const router = express.Router();
const lockersController = require('../controllers/lockersController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, lockersController.getLockers);
router.post('/', auth, lockersController.createLocker);

// ✅ PUT /api/lockers/:id (actualizar locker)
router.put('/:id', auth, lockersController.updateLocker);

// ✅ DELETE /api/lockers/:id (eliminar locker)
router.delete('/:id', auth, lockersController.deleteLocker);

module.exports = router;
