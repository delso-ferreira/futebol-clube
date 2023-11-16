import { Router } from 'express';
import teamsRoute from './teams.router';
import loginRoute from './login.router';
import matchesRoute from './matches.router';
import leaderBoards from './leaderboards.router';

const router = Router();

router.use('/teams', teamsRoute);
router.use('/login', loginRoute);
router.use('/matches', matchesRoute);
router.use('/leaderboard', leaderBoards);

export default router;
