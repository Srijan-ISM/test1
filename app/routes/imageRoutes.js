import express from 'express';
import ImageController from '../controllers/imageController';

const initImageRoutes = () => {
  const imageRoutes = express.Router();

  imageRoutes.put('/', ImageController.image);

  return imageRoutes;
};

export default initImageRoutes;
