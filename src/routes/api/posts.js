const express = require('express');
const router = express.Router();
const postsController = require('../../controllers/posts/posts.controller');
const authMiddleware = require('../../middlewares/authMiddleware');

router.get('/all', postsController.listAllPosts);

router.post('/', authMiddleware, postsController.createPost);

router.get('/', authMiddleware, postsController.listPosts);

router.get('/:id', authMiddleware, postsController.getPostById);

router.put('/:id', authMiddleware, postsController.updatePost);

router.delete('/:id', authMiddleware, postsController.deletePost);


module.exports = router;
