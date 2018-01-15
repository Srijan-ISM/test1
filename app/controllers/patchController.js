import jsonpatch from 'fast-json-patch';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { AuthenticationError, ParameterInvalidError, BadRequestError } from '../errors';
import Output from '../../lib/output';

export default class PatchController {
  static patch(req, res) {
  	PatchController._checkToken(req.token)
  	 .then(() => {
        let errors = jsonpatch.validate(req.body.patch, req.body.doc);
        if (errors) {
          return Output.operationFailed(res, errors);
        }
        let patcheddoc = jsonpatch.applyPatch(req.body.doc, req.body.patch).newDocument;
        return Output.success(res, patcheddoc);
  	  })
     .catch(errorOnClientOperation => Output.operationFailed(res, errorOnClientOperation))
  }

  static _checkToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, 'secret_key', function(error, decoded) {
        if (error) {
          reject(new AuthenticationError("invalid token provided"));
        }
        if (!_.has(decoded, 'user') || !_.has(decoded, 'password')) {
          reject(new AuthenticationError("invalid token provided"));
        }
        resolve();
      })
    })
  }
}
