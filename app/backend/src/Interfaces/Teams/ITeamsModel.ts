import ITeams from './ITeams';

export interface ITeamsModel {
  findAllTeams(): Promise<ITeams[]>
  findTeamByPk(id : number) : Promise<ITeams | null>
}
