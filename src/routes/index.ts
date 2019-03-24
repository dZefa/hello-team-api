import { Router } from 'express';

import { tokenGuard } from '../middlewares/tokenguard';

import { userRouter } from './user.route';
import { teamRouter } from './team.route';

const router = Router();

router.use('/user', userRouter);
router.use('/team', tokenGuard(), teamRouter);

export { router };
