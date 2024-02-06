const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors')
const io = require('socket.io')(8081, {
  cors: {
      origin: 'http://localhost:3000',
  }
});

const checkTokenMiddleware = require('./jsonwebtoken/check')


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors())



const userRouter=require('./routes/user');
const authRouter=require('./routes/auth');





app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/user',/*checkTokenMiddleware,*/ userRouter);
app.use('/auth', authRouter);






app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
