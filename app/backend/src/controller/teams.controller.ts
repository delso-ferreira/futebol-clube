import { Request, Response } from 'express';
import TeamSerVice from '../service/teams.service';

export default class TeamsController {
  constructor(
    private teamService = new TeamSerVice(),
  ) {}

  public async findAllTeams(_req: Request, res: Response) {
    const find = await this.teamService.findAllTeams();
    console.log(find);
    return res.status(200).json(find.data);
  }
}
