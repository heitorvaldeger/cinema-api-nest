import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmesController } from 'src/controllers/filmes/filmes.controller';
import { FilmesRepository } from 'src/domain/repositories/FilmesRepository.repository';
import { FilmesService } from '../../services/filmes/filmes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FilmesRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [FilmesService],
  controllers: [FilmesController],
  exports: [PassportModule]
})
export class FilmesModule {}
