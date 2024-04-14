const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAuthToken = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '24h' });

  return token;
};

module.exports = { generateAuthToken };
