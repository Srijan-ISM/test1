import express from 'express';
import path from 'path';

const initDocRoutes = () => {
  let docRoutes = express.Router();
  docRoutes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../../swagger/index.html'))
  })

  return docRoutes;
};

export default initDocRoutes;