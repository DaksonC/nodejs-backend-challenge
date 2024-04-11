const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Postagens',
      version: '1.0.0',
      description: 'API RESTful para gerenciar postagens',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [`${__dirname}/routes/api/posts.js`],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
