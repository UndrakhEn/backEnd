const router = require('express').Router();
const postControllers = require('../controllers/postController');

//get all the posts
router.get('/get', postControllers.get);
//create a posts
router.post('/create', postControllers.create);
// to update a post
router.post('/update', postControllers.update);
//make delete
router.post('/delete', postControllers.deletee);

module.exports = router;
