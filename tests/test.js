// Import the dependencies for testing
const chai = require('chai'); 
const chaiHttp = require('chai-http');
const app = require('../server/server');

//Tests
const document = 

// Configure chai
chai.use(chaiHttp);
const should = chai.should();


describe("Users", () => {
  describe("POST /", () => {
    //Test login error
    it("should get an error bad credentials", (done) => {
      chai.request(app)
        .post(`/login`)
        .send({email: 'test@test.com', password: '123123'})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
    //Test correct login
    it("should get an successfull login", (done) => {
      chai.request(app)
        .post(`/login`)
        .send({email: 'a@a.com', password: '123'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

  });
});

describe("Domains", () => {
  
});