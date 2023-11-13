import { Request, Response, Router } from 'express';
import MatchesController from '../controller/matches.controller';
import TokenValidation from '../middlewares/token.middleware';

const router = Router();

const matchesController = new MatchesController();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.findAllMatches(req, res),
);

router.patch(
  '/:id/finish',
  TokenValidation.findToken,
  (req: Request, res: Response) => matchesController.inProgressToFinished(req, res),
);

router.patch(
  '/:id',
  TokenValidation.findToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

export default router;
