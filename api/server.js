const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./users/users-router.js');

const server = express();


// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here
server.use(express.json());
server.use(morgan('dev'))
server.use(cors());

server.use('/api/users', addHeader, userRouter)

server.get('/', addHeader, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: 'oops, something went wrong..',
  })
})

module.exports = server;

function addHeader(req, res, next) {
  res.set('X-Header', 'test header');
  next()
}