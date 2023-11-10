import IMatches from '../Interfaces/Matches/IMatches';
import Teams from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';

export default class LoginModel implements IMatchesModel {
  private model = MatchesModel;

  async findAllMatches(): Promise<IMatches[] | null> {
    const find = await this.model.findAll({
      include: [{
        model: Teams,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: Teams,
        as: 'awayTeam',
        attributes: ['teamName'],
      },
      ],
    });
    return find as unknown as IMatches[];
  }

  async findMatchesInProgress(inProgress: boolean) : Promise<IMatches[]> {
    const find = await this.model.findAll({
      where: { inProgress },
      include: [{
        model: Teams,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: Teams,
        as: 'awayTeam',
        attributes: ['teamName'],
      },
      ],
    });
    return find as unknown as IMatches[];
  }
}
