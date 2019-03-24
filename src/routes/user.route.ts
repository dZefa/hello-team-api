import { Router, Response, Request } from 'express';

import { User, UserAddModel, UserLoginModel, UserViewModel } from '../db/models/user.model';
import { UserService } from '../services/user.service';

const userRouter = Router();
const userService = new UserService();

userRouter.post(`/register`, async (req: Request, res: Response) => {
  const payload: UserAddModel = req.body;

  try {
    const user = await userService.register(payload);

    res.status(201).send({ result: { user } });
  }
  catch (err) {
    res.status(500).send({ result: { error: err } });
  }
});

userRouter.post(`/login`, async (req: Request, res: Response) => {
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
