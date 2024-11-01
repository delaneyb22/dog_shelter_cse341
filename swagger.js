const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Dog Shelter API',
    description: 'API for managing dogs in a shelter',
  },
  host: 'https://dog-shelter-cse341.onrender.com', // Use an environment variable for the host
  schemes: ['http', 'https'],
  version: '1.0.0', // Optional: add versioning
};

const outputFile = './swagger.json'; 
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json file 
swaggerAutogen(outputFile, endpointsFiles, doc);