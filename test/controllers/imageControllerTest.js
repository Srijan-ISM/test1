import chai from 'chai';
import httpMocks from 'node-mocks-http';
import EventEmitter from 'events';
import ImageController from '../../app/controllers/imageController';

describe('Image Controller', () => {

  describe('#image()', () => {

    it('should respond with Status: 401 Not Authorized, Reason: invalid token provided', (done) => {

      const {req, res} = httpMocks.createMocks({
        method: 'PUT',
        url: '/image',
        token: 'invalid_token',
        body: {
          url: ""
        }
      }, {eventEmitter: EventEmitter});

      res.on('end', () => {
        let body = JSON.parse(res._getData()), statusCode = res._getStatusCode();
        try {
          chai.expect(res._getStatusCode()).to.equal(401);
          chai.expect(body.reason).to.equal('invalid token provided');
        }
        catch(assertionError) {
          return done(assertionError);
        }
        done();
      });

      ImageController.image(req, res);
    });
    
    it('should respond with Status: 404 Not Found, Reason: invalid url provided', (done) => {

      const {req, res} = httpMocks.createMocks({
        method: 'PUT',
        url: '/image',
        token: config.token,
        body: {
          url: config.invalidUrl
        }
      }, {eventEmitter: EventEmitter});

      res.on('end', () => {
        let body = JSON.parse(res._getData()), statusCode = res._getStatusCode();
        try {
          chai.expect(res._getStatusCode()).to.equal(404);
          chai.expect(body.reason).to.equal('invalid url provided');
        }
        catch(assertionError) {
          return done(assertionError);
        }
        done();
      });

      ImageController.image(req, res);
    });

    it('should respond with Status: 200 success, Result: image thumbnail', (done) => {

      const {req, res} = httpMocks.createMocks({
        method: 'PUT',
        url: '/image',
        token: config.token,
        body: {
          url: config.validUrl
        }
      }, {eventEmitter: EventEmitter});

      res.on('end', () => {
        let statusCode = res._getStatusCode();
        try {
          chai.expect(res._getStatusCode()).to.equal(200);
          chai.expect(res._headers['Content-type']).to.equal('image/jpeg');
        }
        catch(assertionError) {
          return done(assertionError);
        }
        done();
      });

      ImageController.image(req, res);
    });
  })
})
