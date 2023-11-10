import IMatches from './IMatches';

export interface IMatchesModel {
  findAllMatches() : Promise<IMatches[] | null>
  findMatchesInProgress(inProgress: boolean) : Promise<IMatches[]>
}
