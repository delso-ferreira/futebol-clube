import { ServiceResponse } from '../utils/ServiceResponse';
import LeaderBoardsModel from '../models/LeaderboardsModel';
import ILeaderboards from '../Interfaces/LeaderBoards/ILeaderboards';
/* import ILeaderboards from '../Interfaces/LeaderBoards/ILeaderboards'; */

export default class LeaderboardsService {
  constructor(private model = new LeaderBoardsModel()) {}

  public async getHomeLeaderBoards() : Promise<ServiceResponse<ILeaderboards[]>> {
    const find = await this.model.getHomeLeaderBoards();
    return { status: 'SUCESS', data: find };
  }

  public async getAwayLeaderBoards() : Promise<ServiceResponse<ILeaderboards[]>> {
    const find = await this.model.getAwayLeaderBoards();
    return { status: 'SUCESS', data: find };
  }

  public async getCurrentLeaderBoards() : Promise<ServiceResponse<ILeaderboards[]>> {
    const find = await this.model.getCurrentLeaderBoards();
    return { status: 'SUCESS', data: find };
  }
}
