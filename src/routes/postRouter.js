const router = require('express').Router();
const postControllers = require('../controllers/postController');

//get all the posts
router.get('/post/get', postControllers.getPost);
//create a posts
router.post('/post/create', postControllers.createPost);
// to update a post
router.post('/post/update', postControllers.update);
//make delete
router.post('/post/delete', postControllers.deletePost);

module.exports = router;
