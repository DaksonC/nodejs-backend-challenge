const express = require('express');
const router = express.Router();
const postsController = require('../../controllers/posts/posts.controller');

router.post('/', postsController.createPost);
router.get('/', postsController.listPosts);
router.get('/:id', postsController.getPostById);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

module.exports = router;