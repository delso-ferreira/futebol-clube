import { Request, Response, Router } from 'express';
import LeaderBoardsController from '../controller/leaderboards.controller';

const router = Router();

const leaderboardsController = new LeaderBoardsController();

router.get(
  '/',
  (req: Request, res: Response) => leaderboardsController.getCurrentLeaderBoards(req, res),
);

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardsController.getHomeLeaderBoards(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardsController.getAwayLeaderBoards(req, res),
);

export default router;
