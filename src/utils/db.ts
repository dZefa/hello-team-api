import { sequelize } from '../db';
import { User } from '../db/models/user.model';
import { Team } from '../db/models/team.model';

import { logger } from '../utils/logger';

export const syncDB = async () => {
  const force = process.env.NODE_ENV === 'dev';

  try {
    await sequelize.authenticate();
    await Team.sync({ force });
    await User.sync({ force });

    logger(`PG Database has been authenticated`);
  }
  catch (err) {
    console.log(`Error authenticating PG Database. ERROR: ${err}`);
  }
}
