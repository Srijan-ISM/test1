import chai from 'chai';
import httpMocks from 'node-mocks-http';
import EventEmitter from 'events';
import PatchController from '../../app/controllers/patchController';

describe('Patch Controller', () => {

  describe('#patch()', () => {

    it('should respond with Status: 401 Not Authorized, Reason: invalid token provided', (done) => {

      const {req, res} = httpMocks.createMocks({
        method: 'PATCH',
        url: '/change',
        token: 'invalid_token',
        body: {
          doc: {
            baz: "qux",
            foo: "bar"
          },
          patch: [
            { op: "replace", path: "/baz", value: "boo" }
          ]
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

      PatchController.patch(req, res);
    });

    it('should respond with Status: 400 Bad Request, Reason: invalid operation path', (done) => {

      const {req, res} = httpMocks.createMocks({
        method: 'PATCH',
        url: '/change',
        token: config.token,
        body: {
          doc: {
            baz: "qux",
            foo: "bar"
          },
          patch: [
            { op: "replace", path: "/baz1", value: "boo" }
          ]
        }
      }, {eventEmitter: EventEmitter});

      res.on('end', () => {
        let body = JSON.parse(res._getData()), statusCode = res._getStatusCode();
        try {
          chai.expect(res._getStatusCode()).to.equal(400);
          chai.expect(body.reason).to.equal('Cannot perform the operation at a path that does not exist');
        }
        catch(assertionError) {
          return done(assertionError);
        }
        done();
      });

      PatchController.patch(req, res);
    });

    it('should respond with Status: 200 patched document, Result: Patched Document', (done) => {

      const {req, res} = httpMocks.createMocks({
        method: 'PATCH',
        url: '/change',
        token: config.token,
        body: {
          doc: {
            baz: "qux",
            foo: "bar"
          },
          patch: [
            { op: "replace", path: "/baz", value: "boo" }
          ]
        }
      }, {eventEmitter: EventEmitter});

      res.on('end', () => {
        let body = JSON.parse(res._getData()), statusCode = res._getStatusCode();
        try {
          chai.expect(res._getStatusCode()).to.equal(200);
          chai.expect(body).to.be.a('Object');
        }
        catch(assertionError) {
          return done(assertionError);
        }
        done();
      });

      PatchController.patch(req, res);
    });
  })
})
