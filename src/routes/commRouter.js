const router = require('express').Router();
const commControllers = require('../controllers/commentController');

router.get('/get', commControllers.get);
router.post('/create', commControllers.create);
router.post('/update', commControllers.update);
router.post('/delete', commControllers.deletee);

module.exports = router;
