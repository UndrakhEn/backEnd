const router = require('express').Router();
const commControllers = require('../controllers/commentController');

router.post('/get', commControllers.get);
router.post('/getPostId', commControllers.getPostId);
router.post('/reply', commControllers.reply);
router.post('/create', commControllers.create);
router.post('/update', commControllers.update);
router.post('/delete', commControllers.deletee);

module.exports = router;
