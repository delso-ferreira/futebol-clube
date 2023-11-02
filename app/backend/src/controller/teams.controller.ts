import { Request, Response } from 'express';
import TeamSerVice from '../service/teams.service';

export default class TeamsController {
  constructor(
    private teamService = new TeamSerVice(),
  ) {}

  public async findAllTeams(_req: Request, res: Response) {
    const find = await this.teamService.findAllTeams();
    return res.status(200).json(find.data);
  }

  public async findTeamByPk(req: Request, res: Response) {
    const id = Number(req.params.id);
    console.log(id, 'CONTROLLER AQUI');

    const findTeam = await this.teamService.findTeamByPk(id);
    return res.status(200).json(findTeam.data);
  }
}
