const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/get', userController.get);
router.post('/check', userController.check);

module.exports = router;
