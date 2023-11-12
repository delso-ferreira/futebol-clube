import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/UserModel';
import loginMock from './mocks/login.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /login', () => {
    beforeEach(function () { sinon.restore(); });
  
    it ('Should return status 200 and the correct response', async function() {
      const login = loginMock.validLogins
  
      const response = UserModel.build(login[0])
      sinon.stub(UserModel, 'findOne').resolves(response)
  
      const request = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });
  
      expect(request.status).to.be.equal(200)
      expect(request.body).to.have.property('token')
    })
  
    it ('Should return the correct error for invalid email ', async function () {
      const invalidLogin = loginMock.invalidLogins[0]      
  
      const response = UserModel.build(invalidLogin);
      sinon.stub(UserModel, 'findOne').resolves(response)
      
      const request = await chai.request(app).post('/login').send( {
        email: '@admin.com',
        password: 'secret_admin',
      });    
  
      expect(request.status).to.be.equal(401)
      expect(request.body).to.be.property('message');      
      
    })
    it ('Should return the correct error for invalid password ', async function () {
      const invalidLogin = loginMock.invalidLogins[0]      
  
      const response = UserModel.build(invalidLogin);
      sinon.stub(UserModel, 'findOne').resolves(response)
      
      const request = await chai.request(app).post('/login').send( {
        email: 'admin@admin.com',
        password: 'secret_admi',
      });    
  
      expect(request.status).to.be.equal(401)
      expect(request.body).to.be.property('message');      
      
    })
    it ('Should return the correct error for missing email ', async function () {
      const invalidLogin = loginMock.invalidLogins[0]      
  
      const response = UserModel.build(invalidLogin);
      sinon.stub(UserModel, 'findOne').resolves(response)
      
      const request = await chai.request(app).post('/login').send( {
        email: '',
        password: 'secret_admin',
      });    
  
      expect(request.status).to.be.equal(400)
      expect(request.body).to.be.property('message');      
      
    })
    it ('Should return the correct error for missing password ', async function () {
      const invalidLogin = loginMock.invalidLogins[0]      
  
      const response = UserModel.build(invalidLogin);
      sinon.stub(UserModel, 'findOne').resolves(response)
      
      const request = await chai.request(app).post('/login').send( {
        email: '@admin.com',
        password: '',
      });    
  
      expect(request.status).to.be.equal(400)
      expect(request.body).to.be.property('message');      
      
    })
  });