const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Dog Shelter API',
    description: 'API for managing dogs in a shelter',
  },
  host: process.env.HOST || 'localhost:3000', // Use an environment variable for the host
  schemes: ['http', 'https'],
  version: '1.0.0', // Optional: add versioning
};

const outputFile = './swagger.json'; 
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json file 
swaggerAutogen(outputFile, endpointsFiles, doc);