import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { UserRegisterDto } from './user-register.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findUsersById(@Param('id') id: string) {
    return this.userService.isFreeTrialEnded(id);
  }

  @Post('create')
  createUsers(@Body() createUserDto: UserRegisterDto) {
    return this.userService.createUser(createUserDto);
  }
}
