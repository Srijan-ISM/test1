import chai from 'chai';
import httpMocks from 'node-mocks-http';
import EventEmitter from 'events';
import LoginController from '../../app/controllers/loginController';

describe('Login Controller', () => {

  describe('#login()', () => {

    it('should respond with Status: 401 Not Authorized, Reason: user field not provided', (done) => {

      const {req, res} = httpMocks.createMocks({
        method: 'POST',
        url: '/login',
        body: {
          password: "anand"
        }
      }, {eventEmitter: EventEmitter});

      res.on('end', () => {
        let body = JSON.parse(res._getData()), statusCode = res._getStatusCode();
        try {
          chai.expect(res._getStatusCode()).to.equal(401);
          chai.expect(body.reason).to.equal("Provide valid username field");
        }
        catch(assertionError) {
          return done(assertionError);
        }
        done();
      });

      LoginController.login(req, res);
    });

    it('should respond with Status: 401 Not Authorized, Reason: password field not provided', (done) => {

      const {req, res} = httpMocks.createMocks({
        method: 'POST',
        url: '/login',
        body: {
          user: "Aditya"
        }
      }, {eventEmitter: EventEmitter});

      res.on('end', () => {
        let body = JSON.parse(res._getData()), statusCode = res._getStatusCode();

        try {
          chai.expect(res._getStatusCode()).to.equal(401);
          chai.expect(body.reason).to.equal("Provide valid password field");
        }
        catch(assertionError) {
          return done(assertionError);
        }
        done();
      });

      LoginController.login(req, res);
    });

    it('should respond with Status: 401 Not Authorized, Reason: empty user field provided', (done) => {

      const {req, res} = httpMocks.createMocks({
        method: 'POST',
        url: '/login',
        body: {
          user: '',
          password: 'anand'
        }
      }, {eventEmitter: EventEmitter});

      res.on('end', () => {
        let body = JSON.parse(res._getData()), statusCode = res._getStatusCode();

        try {
          chai.expect(res._getStatusCode()).to.equal(401);
          chai.expect(body.reason).to.equal("Provide valid username field");
        }
        catch(assertionError) {
          return done(assertionError);
        }
        done();
      });

      LoginController.login(req, res);
    })

    it('should respond with Status: 401 Not Authorized, Reason: empty password field provided', (done) => {

      const {req, res} = httpMocks.createMocks({
        method: 'POST',
        url: '/login',
        body: {
          user: 'Aditya',
          password: ''
        }
      }, {eventEmitter: EventEmitter});

      res.on('end', () => {
        let body = JSON.parse(res._getData()), statusCode = res._getStatusCode();
        try {
          chai.expect(res._getStatusCode()).to.equal(401);
          chai.expect(body.reason).to.equal("Provide valid password field");
        }
        catch(assertionError) {
          return done(assertionError);
        }
        done();
      });

      LoginController.login(req, res);
    })

    it('should respond with Status: 201 created, Result: access token', (done) => {
      const {req, res} = httpMocks.createMocks({
        method: 'POST',
        url: '/login',
        body: {
          user: 'Aditya',
          password: 'anand'
        }
      }, {eventEmitter: EventEmitter});

      res.on('end', () => {
        let body = JSON.parse(res._getData()), statusCode = res._getStatusCode();
        config.token = body.access_token;
        try {
          chai.expect(res._getStatusCode()).to.equal(201);
          chai.expect(body.access_token).to.be.a('String');
        }
        catch(assertionError) {
          return done(assertionError);
        }
        done();
      });

      LoginController.login(req, res);
    })
  })
})
