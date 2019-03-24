import { TeamAddModel, Team, TeamViewModel } from '../db/models/team.model';
import { User, UserViewModel } from '../db/models/user.model';

interface AddTeamPayload {
  team: TeamViewModel;
  user: UserViewModel;
}

class TeamService {
  private static get teamAttributes(): string[] {
    return ['id', 'name', 'type']
  }

  private userHasTeam(userId: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findByPk(userId);

        if (user.teamId) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
      catch (err) {
        console.log(`Error checking if user already has team. ERROR: ${err}`);
        reject(`SERVER_ERROR`);
      }
    });
  }

  private addTeamToUser(userId: number, teamId: number): Promise<UserViewModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedUser = await User.update({ teamId }, { where: { id: userId } });
        const user: User = await User.findByPk(userId);

        resolve({ username: user.username, id: user.id, email: user.email, teamId: user.teamId });
      }
      catch (err) {
        console.log(`Error adding team to user. ERROR: ${err}`);
        reject(`SERVER_ERROR`);
      }
    });
  }

  public registerTeam({ userId, name, type }: TeamAddModel): Promise<AddTeamPayload | string> {
    return new Promise(async (resolve, reject) => {
      try {
        const hasTeam = await this.userHasTeam(userId);

        if (hasTeam) {
          resolve(`USER_ALREADY_HAS_TEAM`);
        } else {
          const team = await Team.create({ name, type });
          const updatedUser = await this.addTeamToUser(userId, team.id);
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
