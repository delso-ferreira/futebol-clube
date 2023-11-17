import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import LeaderboardsService from '../service/leaderboards.service';
import leaderboardsmock from './mocks/leaderboards.mock';
import ILeaderboards from '../Interfaces/LeaderBoards/ILeaderboards';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /leaderboard/home', () => {
   beforeEach(function () { sinon.restore(); });
 
   it ('Should return status 200 and the correct response', async function() {
     const homeBoard = new LeaderboardsService();
     
     sinon.stub(homeBoard, 'getHomeLeaderBoards').resolves({ status: 'SUCESS', data: leaderboardsmock.validHomeLeaderBoards as unknown as ILeaderboards[] });
     
     const request = await chai.request(app).get('/leaderboard/home');
 
     expect(request.status).to.be.equal(200)
     expect(request.body).to.be.an('array')
     expect(request.body[0]).to.have.keys(
        'name',
        'totalPoints', 
        'totalGames', 
        'totalVictories', 
        'totalDraws', 
        'totalLosses',
        'goalsFavor',
        'goalsOwn',
        'goalsBalance',
        'efficiency'
     );
   })
});


describe('Teste da rota /leaderboard/away', () => {
   beforeEach(function () { sinon.restore(); });
 
   it ('Should return status 200 and the correct response', async function() {
     const awayBoard = new LeaderboardsService();

     sinon.stub(awayBoard, 'getAwayLeaderBoards').resolves({ status: 'SUCESS', data: leaderboardsmock.validAwayLeaderboards as unknown as ILeaderboards[]});
     
     const request = await chai.request(app).get('/leaderboard/away');
 
     expect(request.status).to.be.equal(200)
     expect(request.body).to.be.an('array')
     expect(request.body[0]).to.have.keys(
        'name',
        'totalPoints', 
        'totalGames', 
        'totalVictories', 
        'totalDraws', 
        'totalLosses',
        'goalsFavor',
        'goalsOwn',
        'goalsBalance',
        'efficiency'
     );
   })
});

describe('Teste da rota /leaderboard', () => {
   beforeEach(function () { sinon.restore(); });
 
   it ('Should return status 200 and the correct response', async function() {
     const board = new LeaderboardsService();

     sinon.stub(board, 'getCurrentLeaderBoards').resolves({ status: 'SUCESS', data: leaderboardsmock.validCurrentLeaderBoards as unknown as ILeaderboards[]});
     
     const request = await chai.request(app).get('/leaderboard');
 
     expect(request.status).to.be.equal(200)
     expect(request.body).to.be.an('array')
     expect(request.body[0]).to.have.keys(
        'name',
        'totalPoints', 
        'totalGames', 
        'totalVictories', 
        'totalDraws', 
        'totalLosses',
        'goalsFavor',
        'goalsOwn',
        'goalsBalance',
        'efficiency'
     );
   })
});
 