const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/get', userController.get);
router.post('/check', userController.check);
router.post('/create', userController.create);
router.post('/update', userController.update);
// router.post('/updateUser', userController.updateUser);
router.post('/delete', userController.deletee);

module.exports = router;
