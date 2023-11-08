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
      expect(request.body).to.have.property('data')
    })
  
    it ('Should return the correct error for invalid password or email ', async function () {
      const invalidLogin = loginMock.invalidEmail;

      const invalidPassword = loginMock.invalidPassword;
  
      const response = UserModel.build(invalidLogin[0]);
      sinon.stub(UserModel, 'findOne').resolves(response)

      const passwordResponse = UserModel.build(invalidPassword[0]);
      sinon.stub(UserModel, 'findOne').resolves(passwordResponse)
  
      const request = await chai.request(app).get('/teams/:id').send( {
        email: '@exemplo.com',
        password: 'secret_admin',
      });

      const passwordRequest = await chai.request(app).get('/teams/:id').send( {
        email: 'admin@admin.com',
        password: '123456',
      });
  
      expect(request.status && passwordRequest.status).to.be.equal(401)
      expect(request && passwordRequest).json.to.be.equal({ message: 'Invalid email or password' });
      
      /* expect(passwordRequest.status).to.be.equal(401)
      expect(passwordRequest).json.to.be.equal({ message: 'Invalid email or password' }) */
    })
  });