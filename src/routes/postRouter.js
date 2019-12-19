const router = require('express').Router();
const postControllers = require('../controllers/postController');

//get all the posts
router.post('/get', postControllers.get);
router.post('/getId', postControllers.getId);
router.post('/getUserIdAll', postControllers.getUserIdAll);

//create a posts
router.post('/create', postControllers.create);
// to update a post
router.post('/update', postControllers.update);
//make delete
router.post('/delete', postControllers.deletee);

module.exports = router;
