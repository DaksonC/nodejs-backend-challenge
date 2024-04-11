const express = require('express');
const bodyParser = require('body-parser');
const postsRouter = require('./routes/api/posts');
const { PrismaClient } = require('@prisma/client');
const swaggerDocs = require('./swagger');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/posts', postsRouter);
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err);
    return res.status(400).send({ message: 'Corpo da solicitação inválido' });
  }
  next();
});

swaggerDocs(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
