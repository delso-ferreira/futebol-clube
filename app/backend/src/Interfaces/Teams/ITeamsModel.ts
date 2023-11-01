import ITeams from './ITeams';

export interface ITeamsModel {
  findAllTeams(): Promise<ITeams[]>
}
