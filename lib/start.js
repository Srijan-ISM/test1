import * as express from './express';
import http from 'http';
import https from 'https';
import fs from 'fs';
import logger from './logger';

const start = () => {
  const app = express.init();

  const appStartMessage = () => {
    const env = process.env.NODE_ENV;
    logger.debug(`API is Initialized`);
    logger.info(`App Name : SocialCops`);
    logger.info(`Environment  : ${env || 'development'}`);
    logger.info(`App Port : 3000`);
    logger.info(`Process Id : ${process.pid}`);
  };

  const keyLocation = `${__dirname}/keys/cert.local.pem`
  const certLocation = `${__dirname}/keys/cert.local.pem`

  if (process.env.https == true) {
    https.createServer({
     key: fs.readFileSync(keyLocation, 'utf8'),
     cert: fs.readFileSync(certLocation, 'utf8'),
     ciphers: "ECDHE-RSA-AES128-SHA256:AES128-GCM-SHA256:!RC4:HIGH:!MD5:!aNULL:!EDH",
     honorCipherOrder: true
   }, app).listen(process.env.PORT || 3000, appStartMessage)
  } else { http.createServer(app).listen(process.env.PORT || 3000, appStartMessage); }

}

export default start;
