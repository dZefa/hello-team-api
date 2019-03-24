import { RequestHandler, NextFunction, Request, Response } from 'express';

import { UserAddModel, UserLoginModel } from '../../db/models/user.model';

export const userBodyGuard: ((type: string) => RequestHandler) = ((type) => (req: Request, res: Response, next: NextFunction) => {
  let body: UserAddModel | UserLoginModel | any;
  let isValid: boolean;

  switch (type) {
    case 'user-register':
      body = req.body as UserAddModel;
      isValid = !!body.email && !!body.username && !!body.username;

      break;

    case 'user-login':
      body = req.body as UserLoginModel;
      isValid = !!body.username || !!body.password;

      break;
    default:
      console.log(`Error in User bodyguard. Hit DEFAULT`);
      return res.status(500).send({ result: { error: `SERVER_ERROR` } });
  };

  if (!isValid) {
    return res.status(400).send({ result: { error: `MISSING_INFORMATION` } });
  }

  next();
});
