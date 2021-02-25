import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import session from 'express-session';
import MemoryStore from 'memorystore';
import cors from 'cors';

import indexRouter from './staticrouter/index';
import usersRouter from './user/user.router';
import claimsRouter from './claims/claims.router';
import publicDir from './constant';

import dotenv from 'dotenv';

dotenv.config();

var app = express();

app.all('/login', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

app.use(cors({origin:["http://localhost:3001"], credentials: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));
app.use(session({
  secret: 'whatever',
  store: new (MemoryStore(session))({checkPeriod: 86400000}),
  cookie: {}}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/claims', claimsRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err: any, req: any, res: any, next: Function) {
  res.status(err.status || 500);
  res.sendFile('/error.html', {root: publicDir});
});

module.exports = app;
