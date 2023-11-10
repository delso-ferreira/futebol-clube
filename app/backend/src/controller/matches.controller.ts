import { Request, Response } from 'express';
import MapResponseStatus from '../utils/MapResponseStatus';
import MatchesService from '../service/matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async findAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const strgProgress = JSON.parse(inProgress as string);
    if (!strgProgress) {
      const { status, data } = await this.matchesService.findAllMatches();
      return res.status(MapResponseStatus(status)).json(data);
    }
    const { status, data } = await this.matchesService.findMatchesInProgress(strgProgress);
    return res.status(MapResponseStatus(status)).json(data);
  }

  public async findFinishedMatches(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { status, data } = await this.matchesService.findFinishedMatches(id);
    if (status === 'SUCESS') {
      return res.status(200).json({ message: 'Finished' });
    }
    return res.status(500).json(data);
  }

  public async updateMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchesService.updateMatch(
      id,
      homeTeamGoals,
      awayTeamGoals,
    );
    if (status === 'SUCESS') {
      return res.status(200).json({ message: 'Match Updated' });
    }
    return res.status(500).json(data);
  }
}
