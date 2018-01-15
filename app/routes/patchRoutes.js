import express from 'express';
import PatchController from '../controllers/patchController';

const initPatchRoutes = () => {
  const patchRoutes = express.Router();
  patchRoutes.patch('/', PatchController.patch);

  return patchRoutes;
};

export default initPatchRoutes;
