import { Router, Response, Request } from 'express';

import {  UserAddModel, UserLoginModel } from '../db/models/user.model';
import { userService } from '../services';
import { userBodyGuard } from '../middlewares/bodyguards/user.bodyguard';

const userRouter = Router();

userRouter.post(`/register`, userBodyGuard(`user-register`), async (req: Request, res: Response) => {
  const payload: UserAddModel = req.body;

  try {
    const user = await userService.register(payload);

    if (typeof user === 'string') {
      res.status(400).send({ result: { error: user } });
    } else {
      res.status(201).send({ result: { user } });
    }
  }
  catch (err) {
    res.status(500).send({ result: { error: err } });
  }
});

userRouter.post(`/login`, userBodyGuard(`user-login`), async (req: Request, res: Response) => {
  const payload: UserLoginModel = req.body;

  try {
    const token = await userService.login(payload);

    if (typeof token === 'string') {
      res.status(401).send({ result: { error: token } });
    } else {
      res.status(200).send({ result: token });
    }
  }
  catch (err) {
    res.status(500).send({ result: { error: err } });
  }
});

export { userRouter };
