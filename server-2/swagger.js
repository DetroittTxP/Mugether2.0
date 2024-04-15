const swagger = require('swagger-autogen');

const outputFile = './swaggerDOCS.json'
const endpointsFiles = ['./src/index.js']




swagger(outputFile, endpointsFiles)