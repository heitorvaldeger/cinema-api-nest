import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmesController } from 'src/controllers/filmes/filmes.controller';
import { FilmesRepository } from 'src/models/repositories/FilmesRepository.repository';
import { FilmesService } from '../../services/filmes/filmes.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilmesRepository])],
  providers: [FilmesService],
  controllers: [FilmesController]
})
export class FilmesModule {}
