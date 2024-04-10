const express = require('express');
const bodyParser = require('body-parser');
const postsRouter = require('./routes/api/posts');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/posts', postsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});