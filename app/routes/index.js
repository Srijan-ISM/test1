import Router from 'express';
import initLoginRoutes from './loginRoutes';
import initPatchRoutes from './patchRoutes';
import initImageRoutes from './imageRoutes';
import initDocRoutes from './docRoutes';
import fs from 'fs';

function _verifyToken(req, res, next) {
  if (req.headers.authorization === undefined) {
  	res.status(401).send({message: "Valid accessToken required"});
  }
  const accessToken = req.headers.authorization.split(' ')[1];
  req.token = accessToken;
  next();
}

const initRoutes = (app) => {
  app.use(`/login`, initLoginRoutes());
  app.use(`/patch`, _verifyToken, initPatchRoutes());
  app.use(`/thumbnail`, _verifyToken, initImageRoutes());
  app.use(`/doc`, initDocRoutes());
};

export default initRoutes;
