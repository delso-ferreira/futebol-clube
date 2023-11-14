import { Request, Response } from 'express';
import MapResponseStatus from '../utils/MapResponseStatus';
import MatchesService from '../service/matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async findAllMatches(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        const strgProgress = JSON.parse(inProgress as string);
        const { status, data } = await this.matchesService.findMatchesInProgress(strgProgress);
        return res.status(MapResponseStatus(status)).json(data);
      }
      const { status, data } = await this.matchesService.findAllMatches();
      return res.status(MapResponseStatus(status)).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while processing your request' });
    }
  }

  /* public async inProgressToFinished(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { status } = await this.matchesService.inProgressToFinished(id);
      if (status === 'SUCESS') {
        return res.status(200).json({ message: 'Finished' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Em andamento' });
    }
  } */

  public async inProgressToFinished(req: Request, res: Response) {
    const { id } = req.params;
    const find = await this.matchesService.inProgresstoFinished(id);
    return res.status(MapResponseStatus(find.status)).json(find.data);
  }

  public async updateMatch(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const { status } = await this.matchesService.updateMatch(
        id,
        homeTeamGoals,
        awayTeamGoals,
      );
      if (status === 'SUCESS') {
        return res.status(200).json({ message: 'Match Updated' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao tentar atualizar partida' });
    }
  }
}
