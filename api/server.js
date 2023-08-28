// importing a CommonJS module
const express = require('express'); 
const { 
  logger,
} = require ('./middleware/middleware');
const server = express();
const usersRouter = require('./users/users-router');


// remember express by default cannot parse JSON in request bodies, so use this code 
server.use(express.json());

// so we can use it in the app - runs everytime 
server.use(logger);

// w/e route/endpoint starts with this will go to there 
server.use('/api/users', usersRouter)

// global middlewares and the user's router need to be connected here


//dummy test endpoint
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('*', (req, res) => {
  // catch all 404 errors middleware
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});

module.exports = server;