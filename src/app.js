const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/api/users');
const auth = require('./routes/api/auth');
const postsRouter = require('./routes/api/posts');
const swaggerDocs = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', usersRoutes);
app.use('/api/auth', auth);
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
  console.log(`🔥 Server is running on port:${PORT} 🔥`);
});

module.exports = { app };
