import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import matchesMock from './mocks/matches.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /matches', () => {
    beforeEach(function () { sinon.restore(); });
  
    it ('Should return all matches', async function() {
      const matches = matchesMock.allMatchesMock;
  
      /* const response = MatchesModel.bulkBuild(matches) */
      sinon.stub(MatchesModel, 'findAll').resolves(matches  as unknown as MatchesModel[])
  
      const request = await chai.request(app).get('/matches');
      
  
      expect(request.status).to.be.equal(200)
      expect(request.body).to.be.deep.equal(matches)
    })
  });