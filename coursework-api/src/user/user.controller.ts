import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserMapper } from './user.mapper';
import { UserService } from './user.service';
import { UserByIdPipe } from './user.pipe';
import { JwtAuthGuard } from 'src/security/guards/jwt-auth.guard';
import { UpdateUserDTO } from './user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userMapper: UserMapper,
    private readonly userService: UserService,
  ) {}

  @Get(':id')
  async findById(@Param('id', UserByIdPipe) id: string) {
    const user = await this.userService.findById(id);
    return this.userMapper.getUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Req() req, @Body() user: UpdateUserDTO) {
    const updatedUser = await this.userService.update(req.user.id, user);
    return this.userMapper.getUser(updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Req() req) {
    return await this.userService.delete(req.user.id);
  }
}
