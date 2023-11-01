import { Router } from 'express';
import teamsRoute from './teams.router';

const router = Router();

router.use('/teams', teamsRoute);

export default router;
