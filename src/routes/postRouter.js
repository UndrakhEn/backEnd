const router = require('express').Router();
const postControllers = require('../controllers/postController');

//get all the posts
router.post('/get', postControllers.get);
router.post('/tagged/get', postControllers.getTagged);
router.post('/getId', postControllers.getId);
router.post('/getUserIdAll', postControllers.getUserIdAll);

//create a posts
router.post('/create', postControllers.create);
// to update a post
router.post('/update', postControllers.update);
router.post('/update/perforCode', postControllers.updatePerforCode);
//make delete
router.post('/delete', postControllers.deletee);

module.exports = router;
