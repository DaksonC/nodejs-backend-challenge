const { v4: uuidv4 } = require('uuid');
const { getPagination } = require('../../helpers/utils');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createPost = async (req, res) => {
  const { title, body, tags } = req.body;
  const tagsString = tags.join(',');
  const post = await prisma.post.create({
    data: {
      title,
      body,
      tags: tagsString,
    },
  });
  post.tags = post.tags.split(',');
  res.status(201).json(post);
};

exports.listPosts = async (req, res) => {
  const { startIndex, endIndex } = getPagination(req.query);
  const posts = await prisma.post.findMany({
    skip: startIndex,
    take: endIndex - startIndex,
  });
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (post) {
    post.tags = post.tags.split(',');
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, body, tags } = req.body;
  const tagsString = tags.join(',');
  const updatedPost = await prisma.post.update({
    where: { id },
    data: {
      title,
      body,
      tags: tagsString,
    },
  });
  if (updatedPost) {
    updatedPost.tags = updatedPost.tags.split(',');
    res.json(updatedPost);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const deletedPost = await prisma.post.delete({
    where: { id },
  });
  if (deletedPost) {
    deletedPost.tags = deletedPost.tags.split(',');
    res.json(deletedPost);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};
