import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel'
import teamsMocks from './mocks/teams.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /teams', () => {
  beforeEach(function () { sinon.restore(); });

  it ('Should return status 200 and the correct response', async function() {
    const validList = teamsMocks.validListMock

    const response = TeamsModel.bulkBuild(validList)
    sinon.stub(TeamsModel, 'findAll').resolves(response)

    const request = await chai.request(app).get('/teams').send();

    expect(request.status).to.be.equal(200)
    expect(request.body).to.be.deep.equal(validList)
  })

  it ('Should return the correct team and status', async function () {
    const validTeam = teamsMocks.validTeam;

    const response = TeamsModel.build(validTeam);
    sinon.stub(TeamsModel, 'findByPk').resolves(response)

    const request = await chai.request(app).get('/teams/:id').send();

    expect(request.status).to.be.equal(200)
    expect(request.body).to.be.deep.equal(validTeam);    
  })
});