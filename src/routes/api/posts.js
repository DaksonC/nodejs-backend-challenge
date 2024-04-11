const express = require('express');
const router = express.Router();
const postsController = require('../../controllers/posts/posts.controller');

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API para gerenciamento de postagens
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PostInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         body:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 */


/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Cria uma nova postagem
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       '201':
 *         description: Postagem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Erro ao criar a postagem
 */


router.post('/', postsController.createPost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Lista todas as postagens
 *     tags: [Posts]
 *     responses:
 *       '200':
 *         description: Lista de postagens obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '404':
 *         description: Nenhuma postagem encontrada
 */


router.get('/', postsController.listPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Obtém uma postagem por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID da postagem a ser obtida
 *     responses:
 *       '200':
 *         description: Postagem encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '404':
 *         description: Postagem não encontrada
 */

router.get('/:id', postsController.getPostById);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Atualiza uma postagem por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID da postagem a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostInput'
 *     responses:
 *       '200':
 *         description: Postagem atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '404':
 *         description: Postagem não encontrada
 */

router.put('/:id', postsController.updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Deleta uma postagem por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID da postagem a ser deletada
 *     responses:
 *       '204':
 *         description: Postagem deletada com sucesso
 *       '404':
 *         description: Postagem não encontrada
 */

router.delete('/:id', postsController.deletePost);

module.exports = router;
