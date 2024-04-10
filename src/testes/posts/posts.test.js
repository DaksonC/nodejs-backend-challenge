const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

const { expect } = chai;
chai.use(chaiHttp);

describe('Posts API', () => {
  // Testes para criar uma postagem
  describe('POST /api/posts', () => {
    // ...
  });

  // Testes para listar postagens
  describe('GET /api/posts', () => {
    // ...
  });

  // Testes para obter uma postagem pelo ID
  describe('GET /api/posts/:id', () => {
    // ...
  });
});