import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserRepository } from 'src/prisma/repositories/user.repository';
import { CreateUserDTO } from 'src/user/user.dto';
import { UserMapper } from 'src/user/user.mapper';
import { AlreadyRegisteredException } from 'src/utils/exceptions/already-registered.exception';
import { BudgetRepository } from 'src/prisma/repositories/budget.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly userMapper: UserMapper,
    private readonly budgetRepository: BudgetRepository,
  ) {}

  async register(body: CreateUserDTO) {
    const { password, ...securedUser } = body;

    const user = await this.userRepository.find({
      username: securedUser.username,
    });

    if (user) throw new AlreadyRegisteredException('username');

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userRepository.create({
      ...securedUser,
      password: hashedPassword,
    });

    await this.initUserBudget(newUser);
  }

  private async initUserBudget(user: User) {
    await this.budgetRepository.create({
      amount: 0,
      userId: user.id,
    });
  }

  private async hashPassword(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async login(user: User) {
    return this.getAccessToken(user.id);
  }

  private getAccessToken(userId: string) {
    const payload = { sub: userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.find({ username });

    if (!user) throw new UnauthorizedException('Username is wrong');

    const comparedPasswords = await bcrypt.compare(password, user.password);

    if (!comparedPasswords)
      throw new UnauthorizedException('Password is wrong');

    return this.userMapper.getUser(user);
  }
}
