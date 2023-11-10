import { Request, Response } from 'express';
import MapResponseStatus from '../utils/MapResponseStatus';
import MatchesService from '../service/matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async findAllTeams(req: Request, res: Response) {
    const { query } = req.params;
    const queryString = JSON.parse(query);
    if (!query) {
      const { status, data } = await this.matchesService.findAllMatches();
      return res.status(MapResponseStatus(status)).json(data);
    }
    const { status, data } = await this.matchesService.findMatchesInProgress(queryString);
    return res.status(MapResponseStatus(status)).json(data);
  }
}
