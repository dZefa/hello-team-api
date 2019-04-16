import { Router, Response, Request } from 'express';

import { teamService } from '../services';
import { TeamAddModel, TeamMemberAddModel } from 'src/db/models/team.model';
import { teamBodyGuard } from '../middlewares/bodyguards/team.bodyguard';

const teamRouter = Router();

teamRouter.post('/registerTeam', teamBodyGuard(`team-register`), async (req: Request, res: Response) => {
  const body: TeamAddModel = req.body;

  try {
    const team = await teamService.registerTeam(body);

    if (typeof team === 'string') {
      res.status(400).send({ result: { error: team } });
    } else {
      res.status(201).send({ result: team });
    }
  }
  catch (err) {
    res.status(500).send({ result: { error: err } });
  }
});

teamRouter.post(`/teamMember`, teamBodyGuard(`team-member-add`), async (req: Request, res: Response) => {
  const body: TeamMemberAddModel = req.body;

  try {
    //TODO: Finish
  }
  catch (err) {
    res.status(500).send({ result: { error: err } });
  }
});

export { teamRouter };
