import { Request, Response, Router } from 'express';
import MatchesController from '../controller/matches.controller';

const router = Router();

const matchesController = new MatchesController();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.findAllTeams(req, res),
);

export default router;
