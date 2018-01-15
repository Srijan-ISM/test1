import express from 'express';
import LoginController from '../controllers/loginController';

const initLoginRoutes = (x) => {
  let loginRoutes = express.Router();
  loginRoutes.post('/', LoginController.login);

  return loginRoutes;
};

export default initLoginRoutes;
