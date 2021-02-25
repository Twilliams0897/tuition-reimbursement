import express from 'express';
import * as user from './user';
import logger from '../log';
import publicDir from '../constant';

const router = express.Router();

router.get('/', (req: any, res, next) => {
  let u = {...req.session.user};
  logger.debug(u);
  if(u.name) {
    res.send(JSON.stringify(u));
  } else {
    res.sendStatus(401); // unauthorized
  }
});

router.get('/login', function(req: any, res, next) {
  if(req.session.user) {
      logger.debug(req.sessions.user);
      res.redirect('/');
  }
  res.sendFile('login.html', {root: publicDir});
});

router.post('/', function(req: any, res, next) {
  logger.debug(req.body);
  user.login(req.body.username, req.body.password).then((user) => {
      if (user === null) {
          res.sendStatus(401);
      }
      req.session.user = user;
      res.send(JSON.stringify(user));
  });
});

router.delete('/', (req, res, next) => {
  req.session.destroy((err) => logger.error(err));
  res.sendStatus(204);
})

export default router;
