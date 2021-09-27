import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/users.entity';
import { UserRepository } from 'src/domain/repositories/UserRepository.repository';

import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {

  }

  async signUp (user: User) {
    const { email, nome, senha } = user;
    const salt = await bcrypt.genSalt();

    const userRepository = this.userRepository.create();
    userRepository.nome = nome;
    userRepository.email = email;

    userRepository.confirmationToken = crypto.randomBytes(32).toString('hex');

    userRepository.senha = await bcrypt.hash(senha, salt);

    if (await this.findUserByEmail(email)) {
      throw new ConflictException('Endereço de email já está em uso');
    }

    try {
      await userRepository.save();

      delete userRepository.senha;

      return userRepository;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o usuário no banco de dados',
      );
    }
  }

  async findUserByEmail (email: string) {
    try {
      const user = await this.userRepository.findOne({
        email: email
      });

      return user;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Erro ao procurar o usuário no banco de dados',
      );
    }
  }
}
