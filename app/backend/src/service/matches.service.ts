import MatchesModel from '../models/MatchesModel';
import IMatches from '../Interfaces/Matches/IMatches';
import { ServiceResponse } from '../utils/ServiceResponse';

export default class MatchesService {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
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

  public async findFinishedMatches(id: number): Promise<ServiceResponse<object>> {
    const find = await this.matchesModel.findFinishedMatches(id);
    return { status: 'SUCESS', data: { find } };
  }

  public async updateMatch(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<object>> {
    const find = await this.matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCESS', data: { find } };
  }
}
