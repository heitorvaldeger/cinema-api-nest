import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/users/users.controller';
import { UserRepository } from 'src/domain/repositories/UserRepository.repository';
import { UsersService } from 'src/services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
