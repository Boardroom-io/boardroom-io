const fs = require('fs');
const path = require('path');

const request = require('supertest');
const expect = require('chai').expect;

const PORT = process.env.PORT || 3000;
const HOST = `http://localhost:${PORT}`;

// Start the server by running the server.js file
require('../server/server.js');


describe('Server routes', function() {
  describe('GET request to /', function() {
    it('should respond with a status of 200', function(done) {
      request(HOST)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200, done);
    });
  });

  describe('GET request to /styles.css', function() {
    it('should respond with a status of 200', function(done) {
      request(HOST)
        .get('/style.css')
        .expect('Content-Type', /text\/css/)
        .expect(200, done);
    });

    it('should respond with the style.css file', function(done) {
      request(HOST)
        .get('/style.css')
        .expect(response => {
          const file = fs.readFileSync(path.resolve('client/style.css'));
          expect(file.toString()).to.equal(response.text);
        })
        .expect(200, done);
    });
  });

  describe('GET request to invalid route', function() {
    it('should respond with a status of 404',function(done) {
      request(HOST)
        .get('/hi')
        .expect(404,done)
    });
  });

  describe('POST request to any route', function() {
    it('should respond with a status of 405', function(done) {
      request(HOST)
        .post('/')
        .expect(405, done);
    });
  });
});
