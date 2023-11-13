import IMatches from './IMatches';

export interface IMatchesModel {
  findAllMatches() : Promise<IMatches[] | null>
  findMatchesInProgress(inProgress: boolean) : Promise<IMatches[]>
  inProgressToFinished(id: number) : Promise<IMatches | number>
  updateMatch(
    id:number,
    homeTeamGoals: number,
    awayTeamGoals: number,) : Promise <IMatches | number>
}
