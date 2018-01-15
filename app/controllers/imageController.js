import jimp from 'jimp';
import request from 'request';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import fs from 'fs';
import { AuthenticationError, ParameterInvalidError, BadRequestError } from '../errors';
import Output from '../../lib/output';
//`${fileName}.jpg`
export default class ImageController {
  static image(req, res) {
    let file, extension;
    ImageController._verifyToken(req.token)
     .then((fileName) => {
        file = fileName;
        return ImageController._download(req.body.url, fileName)
      })
     .then((imageExtension) => {
        extension = imageExtension;
        return jimp.read(`${file}.${extension}`)
      })
     .then((image) => 
        image.resize(50, 50)
         .quality(60)
         .write(`${file}_thumbnail.${extension}`)
      )
     .then(() => {
        return fs.readFile(`${file}_thumbnail.${extension}`, (err, content) => {
          res.writeHead(200,{'Content-type':`image/${extension}`});
          res.end(content);
        })
      })
     .catch(errorOnClientOperation => Output.operationFailed(res, errorOnClientOperation)) 
  }

  static _verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, 'secret_key', (error, decoded) => {
        if (error) {
          reject(new AuthenticationError("invalid token provided"));
        }
        if (!_.has(decoded, 'user') || !_.has(decoded, 'password')) {
          reject(new AuthenticationError("invalid token provided"));
        }
        resolve(`${__dirname}/../images/${decoded.user}`);
      })
    })

  }

  static _download(url, fileName) {
    return new Promise((resolve, reject) => {
      let imageExtension;
      const download = (uri, filename, callback) => {
        request.head(uri, (err, res, body) => {
          if (!((res.headers['content-type']).match(/(image)+\//g))) {
            reject(new ParameterInvalidError("invalid url provided"));
          }
          imageExtension = res.headers['content-type'].split("/")[1];
          filename = `${fileName}.${imageExtension}`;
          request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
      };

      download(url, fileName, () => {
        resolve(imageExtension);
      })
    })
  }
}
