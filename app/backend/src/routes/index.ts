import { Router } from 'express';
import teamsRoute from './teams.router';
import loginRoute from './login.router';

const router = Router();

router.use('/teams', teamsRoute);
router.use('/login', loginRoute);

export default router;
