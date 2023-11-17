// @ts-ignore
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import matchesMock from './mocks/matches.mock';
import Matches from '../database/models/MatchesModel'
import Teams from '../database/models/TeamsModel'
import loginMock from './mocks/login.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /matches', () => {
    beforeEach(function () { sinon.restore(); });
  
    it('Should return all matches', async function() {
      const matches = matchesMock.allMatchesMock;
  
      /* const response = Matches.bulkBuild(matches)
      console.log(response); */
      

      sinon.stub(Matches, 'findAll').resolves(matches as unknown as Matches[]) // minha classe 
  
      const request = await (chai.request(app).get('/matches'));                     
  
      expect(request.status).to.be.equal(200)
      expect(request.body).to.be.deep.equal(matches)
    })
    it('Should return all finished matches', async function() {
      const matches = matchesMock.matchesFinishedMock;
  
      /* const response = Matches.bulkBuild(matches)
      console.log(response); */      

      sinon.stub(Matches, 'findAll').resolves(matches as unknown as Matches[]) // minha classe 
  
      const request = await (chai.request(app).get('/matches?inProgress=false'));                     
  
      expect(request.status).to.be.equal(200)
      expect(request.body).to.be.deep.equal(matches)
    })
    it('Should return all matches in progress', async function() {
      const matches = matchesMock.matchesInProgressMock;
  
      /* const response = Matches.bulkBuild(matches)
      console.log(response); */      

      sinon.stub(Matches, 'findAll').resolves(matches as unknown as Matches[]) // minha classe 
  
      const request = await (chai.request(app).get('/matches?inProgress=true'));                     
  
      expect(request.status).to.be.equal(200)
      expect(request.body).to.be.deep.equal(matches)
    })   
    it('Should finish the match by id', async function() {
      
      sinon.stub(Matches, 'update').resolves()
  
      const {status, body} = await chai.request(app).patch('/matches/41/finish').set('authorization', `Bearer ${ loginMock.validLoginAcessMock.token }`)
  
      expect(status).to.be.equal(200)
      expect(body).to.be.deep.equal({ message: 'Finished'})
    })
    it('Should update the match correctly', async function() {            
  
      sinon.stub(Matches, 'update').resolves();      
  
      const {status, body} = await chai.request(app).patch('/matches/5').set('authorization', `Bearer ${ loginMock.validLoginAcessMock.token }`)
      .send({
        "homeTeamGoals": 3,
        "awayTeamGoals": 4
      });
  
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ message: 'Match Updated' });    }) 
      it('Should not create a match with two equal teams', async function() {
        const team = Teams.build({ id: 1, teamName: "Barcelona" });
    
        sinon.stub(Teams, 'findByPk').resolves(team);
    
        const request = await chai.request(app).post('/matches').set('authorization', `Bearer ${ loginMock.validLoginAcessMock.token }`)
        .send({
          homeTeamId: 1,
          awayTeamId: 1,
          homeTeamGoals: 1,
          awayTeamGoals: 2
        });
    
        expect(request.status).to.be.equal(422);
        expect(request.body).to.be.deep.equal({ message: "It is not possible to create a match with two equal teams" });
      });    
      it('Should not create a match with a non-existent team', async function() {
        sinon.stub(Teams, 'findByPk').resolves(null);
    
        const request = await chai.request(app).post('/matches').set('authorization', `Bearer ${ loginMock.validLoginAcessMock.token }`)
        .send({
          homeTeamId: 1,
          awayTeamId: 2,
          homeTeamGoals: 1,
          awayTeamGoals: 2
        });
    
        expect(request.status).to.be.equal(404);
        expect(request.body).to.be.deep.equal({ message: "There is no team with such id!" });
      });

  });
  
 