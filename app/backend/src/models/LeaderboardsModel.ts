import { QueryTypes } from 'sequelize';
import querys from '../utils/querys';
import Sequelize from '../database/models/index';
import ILeaderboards from '../Interfaces/LeaderBoards/ILeaderboards';

export default class Leaderboards {
  private sequelize = Sequelize;

  public async getHomeLeaderBoards() : Promise<ILeaderboards[]> {
    const find = this.sequelize.query(querys.homeLeaderboards, { type: QueryTypes.SELECT });
    return find as unknown as ILeaderboards[];
  }

  public async getAwayLeaderBoards() : Promise<ILeaderboards[]> {
    const find = this.sequelize.query(querys.awayLeaderboards, { type: QueryTypes.SELECT });
    return find as unknown as ILeaderboards[];
  }

  public async getCurrentLeaderBoards() : Promise<ILeaderboards[]> {
    const find = this.sequelize.query(querys.currentLeaderboards, { type: QueryTypes.SELECT });
    return find as unknown as ILeaderboards[];
  }
}
