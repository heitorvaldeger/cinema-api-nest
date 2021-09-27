import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { User } from 'src/domain/entities/users.entity';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor (private usersService: UsersService) {

  }

  @Post()
  async create (
    @Body(ValidationPipe) userModel: User
  ) : Promise<User> {
    const user = await this.usersService.signUp(userModel);

    return user;
  }
}
