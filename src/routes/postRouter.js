const router = require('express').Router();
const postControllers = require('../controllers/postController');

//get all the posts
router.get('/post/get', postControllers.getPost);
//create a posts
router.post('/post/create', postControllers.post);
// to update a post
router.put('/post/update/:id', postControllers.update);
//make delete
router.delete('/post/delete/:id', postControllers.deletePost);

module.exports = router;
