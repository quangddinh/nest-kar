import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

// promisify -> scrypt

const scrypt = promisify(_scrypt);

// copy user service
@Injectable()
export class AuthService {
  // cloning user service
  constructor(private userService: UserService) {}

  async signUp(email: string, password: string) {
    // check user exist
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    // hash password
    // generate salt -> 16 char || number
    const salt = randomBytes(8).toString('hex');
    // hash salt + password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // join
    const result = salt + '.' + hash.toString('hex');
    // create user and save
    const user = await this.userService.create(email, result);

    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
