import { IncomingHttpHeaders } from 'http';
import { RequestHandler, NextFunction, Response, Request } from 'express';

import { userService } from '../services';

const getToken = (headers: IncomingHttpHeaders): string => {
  const authHeader = headers.authorization;

  return authHeader;
};

export const tokenGuard: (() => RequestHandler) = (() => async (req: Request, res: Response, next: NextFunction) => {
  const token = getToken(req.headers);

  if (!token) {
    return res.status(412).send({ result: { error: `MISSING_HEADERS` } });
  }

  try {
    const userId = await userService.verifyToken(token);

    if (typeof userId === 'number') {
      res.locals.userId = userId;
    }
  }
  catch (err) {
    console.log(`Error in token guard. ERROR: ${err}`);

    return res.status(500).send({ result: { error: err } });
  }

  next();
});
