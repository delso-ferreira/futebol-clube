import ITeams from '../Interfaces/Teams/ITeams';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import ModelTeams from '../database/models/TeamsModel';

export default class TeamModel implements ITeamsModel {
  private model = ModelTeams;

  async findAllTeams(): Promise<ITeams[]> {
    const find = await this.model.findAll();
    return find;
  }

  async findTeamByPk(id : number) : Promise<ITeams[]> {
    const findTeam = await this.model.findByPk(id);
    return findTeam;
  }
}
