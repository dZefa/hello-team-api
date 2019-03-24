import { RequestHandler, NextFunction, Request, Response } from 'express';

import { TeamAddModel, TeamMemberAddModel } from '../../db/models/team.model';

export const teamBodyGuard: ((type: string) =>  RequestHandler) = ((type) => (req: Request, res: Response, next: NextFunction) => {
  let body: TeamAddModel | any;
  let isValid: boolean;

  switch (type) {
    case 'team-register':
      body = req.body as TeamAddModel;
      isValid = !!body.userId && !!body.name && !!body.type;

      break;

    case 'team-member-add':
      body = req.body as TeamMemberAddModel;
      isValid = !!body.username;

      break;
    
    default:
      console.log(`Error in Team bodyguard. Hit DEFAULT`);
      return res.status(500).send({ result: { error: `SERVER_ERROR` } });
  }

  if (!isValid) {
    return res.status(400).send({ result: { error: `MISSING_INFORMATION` } });
  }

  next();
});
