import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { AuthenticationError, ParameterInvalidError, BadRequestError } from '../errors';
import Output from '../../lib/output';

export default class LoginController {
  static login(req, res) {
    LoginController._checkInput(req.body)
     .then(userDetails => {
        return jwt.sign({ user: userDetails.user, password: userDetails.password }, 'secret_key', (errorInEncoding, encoded) => {
          if (errorInEncoding) {
            return Output.operationFailed(res, errorInEncoding);
          }
          return Output.created(res, { access_token: encoded });
        }) 
      })
     .catch(errorOnClientOperation => Output.operationFailed(res, errorOnClientOperation))
  }

  static _checkInput(userData) {
    return new Promise((resolve, reject) => {
      if ( !_.has(userData, 'user') || userData.user == '' ) {
        reject(new AuthenticationError("Provide valid username field"));
      }
      if ( !_.has(userData, 'password') || userData.password == '' ) {
        reject(new AuthenticationError("Provide valid password field"));
      }
      resolve(_.pick(userData, ['user', 'password']))
    })
  }
}
