const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API Documentation');
});

// Define Swagger API documentation
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Dog Shelter API',
      version: '1.0.0',
      description: 'API for managing dogs and shelters',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

module.exports = router;