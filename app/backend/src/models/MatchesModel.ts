import IMatches from '../Interfaces/Matches/IMatches';
import Teams from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';

export default class MatchModel implements IMatchesModel {
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
      where: {
        inProgress,
      },
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

  async inProgressToFinished(id:number): Promise<IMatches | null> {
    const find = await this.model.findByPk(id);
    if (find) {
      await this.model.update({ inProgress: false }, { where: { id } });
      console.log(find);
      return find.dataValues;
    }
    return null;
  }

  async updateMatch(
    id:number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatches | number> {
    const find = await this.model.findByPk(id);
    if (find) {
      await find.update({ homeTeamGoals, awayTeamGoals });
      return find.dataValues;
    }
    return 401;
  }
}
