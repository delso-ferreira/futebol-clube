import { ServiceResponse } from '../utils/ServiceResponse';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import TeamModel from '../models/TeamModel';
import ITeams from '../Interfaces/Teams/ITeams';

export default class TeamSerVice {
  constructor(
    private modelTeams : ITeamsModel = new TeamModel(),
  ) {}

  public async findAllTeams() : Promise<ServiceResponse<ITeams[]>> {
    const find = await this.modelTeams.findAllTeams();

    return { status: 'SUCESS', data: find };
  }

  public async findTeamByPk(id : number) : Promise<ServiceResponse<ITeams | null>> {
    const findTeam = await this.modelTeams.findTeamByPk(id);
    console.log(findTeam, 'SERVICE AQUI');

    return { status: 'SUCESS', data: findTeam };
  }
}
