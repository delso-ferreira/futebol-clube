import MatchesModel from '../models/MatchesModel';
import IMatches from '../Interfaces/Matches/IMatches';
import { ServiceResponse } from '../utils/ServiceResponse';
import TeamModel from '../models/TeamModel';

export default class MatchesService {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
    private teamsModel: TeamModel = new TeamModel(),
  ) { }

  public async findAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const find = await this.matchesModel.findAllMatches();
    if (!find) {
      return { status: 'NOT_FOUND', data: { message: 'Não encontrado' } };
    }
    return { status: 'SUCESS', data: find };
  }

  public async findMatchesInProgress(inProgress: boolean): Promise<ServiceResponse<IMatches[]>> {
    const find = await this.matchesModel.findMatchesInProgress(inProgress);
    return { status: 'SUCESS', data: find };
  }

  public async inProgresstoFinished(id: string): Promise<ServiceResponse<unknown>> {
    const find = await this.matchesModel.inProgressToFinished(Number(id));
    if (!find) {
      return { status: 'NOT_FOUND', data: { message: 'No Matches' } };
    }
    if (find.inProgress === false) {
      return { status: 'BAD_REQUEST', data: { message: 'Match finished allready' } };
    }
    await this.matchesModel.inProgressToFinished(Number(id));
    return { status: 'SUCESS', data: { message: 'Finished' } };
  }

  public async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<object>> {
    const find = await this.matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCESS', data: { find } };
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId:number,
    homeTeamGoals:number,
    awayTeamGoals:number,
  ) : Promise<ServiceResponse<IMatches>> {
    if (homeTeamId === awayTeamId) {
      return { status: 'UNAUTHORIZED',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    } const homeTeam = await this.teamsModel.findTeamByPk(homeTeamId);
    const awayTeam = await this.teamsModel.findTeamByPk(awayTeamId);
    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    } const match = await this.matchesModel.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    ); return { status: 'UPDATE', data: match };
  }
}
