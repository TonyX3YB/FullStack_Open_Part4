const http = require('http');
const app = require('./app');
const config = require('./utils/config');

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

