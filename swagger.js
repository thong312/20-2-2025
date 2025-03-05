const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Camera and AI Box API',
      version: '1.0.0',
      description: 'API documentation for Camera and AI Box management',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./server.js'], // Đường dẫn tới file chứa routes
};

module.exports = swaggerJsdoc(options);
