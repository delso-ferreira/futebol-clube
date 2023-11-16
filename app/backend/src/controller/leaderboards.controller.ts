import { Request, Response } from 'express';
import LeaderboardsService from '../service/leaderboards.service';
import MapResponseStatus from '../utils/MapResponseStatus';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardsService(),
  ) {}

  public async getHomeLeaderBoards(_req: Request, res: Response) {
    const { data, status } = await this.leaderboardService.getHomeLeaderBoards();
    return res.status(MapResponseStatus(status)).json(data);
  }

  public async getAwayLeaderBoards(_req: Request, res: Response) {
    const { data, status } = await this.leaderboardService.getAwayLeaderBoards();
    return res.status(MapResponseStatus(status)).json(data);
  }

  public async getCurrentLeaderBoards(_req: Request, res: Response) {
    const { data, status } = await this.leaderboardService.getCurrentLeaderBoards();
    return res.status(MapResponseStatus(status)).json(data);
  }
}
