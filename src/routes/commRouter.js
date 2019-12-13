const router = require('express').Router();
const commControllers = require('../controllers/commentController');

router.get('/get', commControllers.get);
router.get('/getPostId', commControllers.getPostId);
router.post('/reply', commControllers.reply);
router.post('/create', commControllers.create);
router.post('/update', commControllers.update);
router.post('/delete', commControllers.deletee);

module.exports = router;
