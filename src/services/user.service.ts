import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Bluebird from 'bluebird';

import { User, UserViewModel, UserAddModel, UserLoginModel } from '../db/models/user.model';

interface JWTSignedToken {
  token: string;
}

interface JWTPayload {
  id: number;
  email: string;
}

class UserService {
  private readonly _saltRounds = Number(process.env.SALT);
  private readonly _jwtSecret = process.env.JWT_SECRET;

  private static get userAttributes(): string[] {
    return ['id', 'email', 'username', 'teamId'];
  }

  private getUserById(id: number) {
    const attributes = UserService.userAttributes;

    return User.findByPk(id, { attributes });
  }

  private checkPW(password: string, hash: string): Promise<boolean | string> {
    return new Promise(async (resolve, reject) => {
      try {
        const pwMatches = await bcrypt.compare(password, hash);

        resolve(pwMatches);
      }
      catch (err) {
        console.log(`Error hashing pw in checkPW`);
        reject(`SERVER_ERROR`);
      }
    });
  }

  private checkUsernameAndEmail(username: string, email: string): Promise<boolean | string> {
    return new Promise(async (resolve, reject) => {
      try {
        const userName = await User.findOne({ where: { username } });
        const userEmail = await User.findOne({ where: { email } });

        if (!userName && !userEmail) {
          resolve(true);
        } else {
          resolve(`USERNAME_OR_EMAIL_EXISTS`);
        }
      }
      catch (err) {
        console.log(`Error checking DB for username/email`);
        reject(`SERVER_ERROR`);
      }
    });
  }

  public register({ email, username, password }: UserAddModel): Promise<UserViewModel> {
    return new Promise(async (resolve, reject) => {
      try {
        const canCreate = await this.checkUsernameAndEmail(username, email);

        if (typeof canCreate === 'string') {
          reject(canCreate);
        } else {
          const hash = await bcrypt.hash(password, this._saltRounds);
          const user = await User.create({ email, username, password: hash });
  
          resolve({ id: user.id, username: user.username, email: user.email, teamId: user.teamId });
        }
      }
      catch (err) {
        console.log(`Error registering User. ERROR: ${err}`);
        reject(`SERVER_ERROR`);
      }
    });
  }

  public login({ username, password }: UserLoginModel): Promise<JWTSignedToken> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ where: { username } });
        const matches = await this.checkPW(password, user.password);

        if (matches) {
          const token = jwt.sign({ id: user.id, username: user.username }, this._jwtSecret, { expiresIn: '30 days' });

          resolve({ token });
        } else {
          reject(`INCORRECT_USERNAME_OR_PASSWORD`);
        }
      }
      catch (err) {
        console.log(`Error logging in User. ERROR: ${err}`);
        reject(`SERVER_ERROR`);
      }
    });
  }

  public verifyToken(token: string): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        const verifiedInfo: JWTPayload | any = await jwt.verify(token, this._jwtSecret);

        if (verifiedInfo) {
          resolve(verifiedInfo.id);
        }
      }
      catch (err) {
        console.log(`Error verifying token. ERROR: ${err}`);

        if (err.message === 'invalid token') {
          reject(`INVALID_TOKEN`);
        } else {
          reject(`SERVER_ERROR`);
        }
      }
    });
  }
}

export { UserService };
