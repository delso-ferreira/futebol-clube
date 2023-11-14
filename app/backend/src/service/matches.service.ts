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

  /*  public async inProgressToFinished(id: number): Promise<ServiceResponse<object>> {
    const find = await this.matchesModel.inProgressToFinished(id);
    if (!find) {
      return { status: 'NOT_FOUND', data: { message: 'No Matches Found' } };
    }
    return { status: 'SUCESS', data: { find } };
  }
 */

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
}
