const { getPagination } = require('../../helpers/utils');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createPost = async (req, res) => {
  const { title, body, tags, authorId } = req.body;
  const tagsString = tags.join(',');

  try {
    const existingAuthor = await prisma.user.findUnique({ where: { id: authorId } });
    if (!existingAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }

    const post = await prisma.post.create({
      data: {
        title,
        body,
        tags: tagsString,
        author: { connect: { id: authorId } },
      },
    });
    post.tags = post.tags.split(',');
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
};

exports.listPosts = async (req, res) => {
  const { userId } = req.query;
  const { startIndex, endIndex, sortBy = 'title', order = 'asc' } = getPagination(req.query);

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const posts = await prisma.post.findMany({
      where: { authorId: userId },
      skip: startIndex,
      take: endIndex - startIndex,
      orderBy: { [sortBy]: order },
    });
    res.json(posts);
  } catch (error) {
    console.error('Error listing posts:', error);
    res.status(500).json({ message: 'Failed to list posts' });
  }
};

exports.getPostById = async (req, res) => {
  const { userId } = req.query;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const post = await prisma.post.findUnique({
      where: { id, authorId: userId },
    });
    if (post) {
      post.tags = post.tags.split(',');
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error getting post:', error);
    res.status(500).json({ message: 'Failed to get post' });
  }
};

exports.updatePost = async (req, res) => {
  const { userId } = req.query;
  const { id } = req.params;
  const { title, body, tags } = req.body;
  const tagsString = tags.join(',');

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const postToUpdate = await prisma.post.findUnique({
      where: { id, authorId: userId },
    });
    if (!postToUpdate) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        body,
        tags: tagsString,
      },
    });
    updatedPost.tags = updatedPost.tags.split(',');
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Failed to update post' });
  }
};

exports.deletePost = async (req, res) => {
  const { userId } = req.query;
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const deletedPost = await prisma.post.delete({
      where: { id, authorId: userId },
    });

    if (deletedPost) {
      deletedPost.tags = deletedPost.tags.split(',');
      res.json(deletedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Failed to delete post' });
  }
};

exports.listAllPosts = async (req, res) => {
  const { startIndex, endIndex, sortBy = 'title', order = 'asc' } = getPagination(req.query);

  try {
    const allPosts = await prisma.post.findMany({
      skip: startIndex,
      take: endIndex - startIndex,
      orderBy: { [sortBy]: order },
    });
    res.json(allPosts);
  } catch (error) {
    console.error('Error listing all posts:', error);
    res.status(500).json({ message: 'Failed to list all posts' });
  }
};

