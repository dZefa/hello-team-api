import { Router, Response, Request } from 'express';

import { TeamService } from '../services/team.service';
import { TeamAddModel } from 'src/db/models/team.model';
import { teamBodyGuard } from '../middlewares/bodyguards/team.bodyguard';

const teamRouter = Router();
const teamService = new TeamService();

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

export { teamRouter };
