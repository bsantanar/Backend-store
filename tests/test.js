// Import the dependencies for testing
const chai = require('chai'); 
const chaiHttp = require('chai-http');
const app = require('../server/server');

// Configure chai
chai.use(chaiHttp);
const should = chai.should();

describe("Questions", () => {
  describe("GET /", () => {
      // Test to get all Questions record
      it("should get all Questions record", (done) => {
           chai.request(app)
               .get('/questions')
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   done();
                }).timeout(5000);
       });
      // Test to get single Question record
      // it("should get a single Question record", (done) => {
      //      const id = 1;
      //      chai.request(app)
      //          .get(`/${id}`)
      //          .end((err, res) => {
      //              res.should.have.status(200);
      //              res.body.should.be.a('object');
      //              done();
      //           });
      //  });
       
      // // Test to get single Question record
      // it("should not get a single Question record", (done) => {
      //      const id = 5;
      //      chai.request(app)
      //          .get(`/${id}`)
      //          .end((err, res) => {
      //              res.should.have.status(404);
      //              done();
      //           });
      //  });
  });
});