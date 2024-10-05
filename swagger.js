const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Dog Shelter Api',
    description: 'Api for managing dogs in a shelter',
  },
  host: 'localhost:3000',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//generate swagger.json file 
swaggerAutogen(outputFile, endpointsFiles, doc);