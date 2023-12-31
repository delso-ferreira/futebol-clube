import { Request, Response, Router } from 'express';
import TeamsController from '../controller/teams.controller';

const router = Router();

const teamsController = new TeamsController();

router.get('/', (req: Request, res: Response) => teamsController.findAllTeams(req, res));

router.get('/:id', (req: Request, res: Response) => teamsController.findTeamByPk(req, res));

export default router;
