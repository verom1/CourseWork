import { Injectable, PipeTransform } from '@nestjs/common';
import { UserRepository } from 'src/prisma/repositories/user.repository';

import { InvalidEntityIdException } from 'src/utils/exceptions/invalid-entity-id.exception';

@Injectable()
export class UserByIdPipe implements PipeTransform<string, Promise<string>> {
  constructor(private readonly userRepository: UserRepository) {}

  async transform(userId: string): Promise<string> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new InvalidEntityIdException('User');
    }

    return userId;
  }
}
