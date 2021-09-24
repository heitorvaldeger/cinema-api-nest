import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Filme } from 'src/models/filme.model';
import { FilmesRepository } from 'src/models/repositories/FilmesRepository.repository';

@Injectable()
export class FilmesService {
  constructor(
    @InjectRepository(FilmesRepository)
    private filmesRepository: FilmesRepository
  ) {}

  async create (filmeModel: Filme) {
    const {
      isAtivo,
      titulo,
      sinopse,
      classificacaoIdade,
      genero,
      horario,
      sala
    } = filmeModel;

    try {
      const filme = this.filmesRepository.create();

      filme.isAtivo = isAtivo;
      filme.horario = horario;
      filme.sinopse = sinopse;
      filme.titulo = titulo;
      filme.classificacaoIdade = classificacaoIdade;
      filme.genero = genero;
      filme.sala = sala;

      await filme.save();

      return filme;
    } catch (error) {
      
    }
  }
}
