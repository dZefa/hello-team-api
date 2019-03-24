import { TeamAddModel, Team, TeamViewModel } from '../db/models/team.model';
import { User, UserViewModel } from '../db/models/user.model';
import { userService } from './';

interface AddTeamPayload {
  team: TeamViewModel;
  user: UserViewModel;
}

class TeamService {
  private static get teamAttributes(): string[] {
    return ['id', 'name', 'type']
  }

  public registerTeam({ userId, name, type }: TeamAddModel): Promise<AddTeamPayload | string> {
    return new Promise(async (resolve, reject) => {
      try {
        const hasTeam = await userService.userHasTeam(userId);

        if (hasTeam) {
          resolve(`USER_ALREADY_HAS_TEAM`);
        } else {
          const team = await Team.create({ name, type });
          const updatedUser = await userService.addTeamToUser(userId, team.id);
          const updatedTeam = await Team.findByPk(team.id, {
            include: [{ model: User, as: 'users', attributes: ['username', 'id'] }],
          });

          const teamPayload: TeamViewModel = {
            id: team.id,
            name: team.name,
            type: team.type,
            users: updatedTeam.users,
          };

          resolve({ team: teamPayload , user: updatedUser })
        }
      }
      catch (err) {
        console.log(`Error registering team. ERROR: ${err}`);
        reject(`SERVER_ERROR`);
      }
    });
  }
}

export { TeamService };
