import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Filmes } from 'src/domain/entities/filmes.entity';
import { FilmesRepository } from 'src/domain/repositories/FilmesRepository.repository';

@Injectable()
export class FilmesService {
  constructor(
    @InjectRepository(FilmesRepository)
    private filmesRepository: FilmesRepository
  ) {}

  async findFilmeById (idFilme: number) {
    const filme = await this.filmesRepository.findOne({
      id: idFilme
    });

    if (!filme) {
      throw new NotFoundException({message: "Filme não encontrado"});
    }

    return filme; 
  }

  async create (filmeModel: Filmes) {
    try {
      const filme = this.filmesRepository.create(filmeModel);

      await filme.save();

      return filme;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao criar um filme',
      );
    }
  }

  async update (filmeModel: Filmes, idFilme: number) {
    const {
      isAtivo,
      titulo,
      sinopse,
      classificacaoIdade,
      genero,
      horario,
      sala
    } = filmeModel;

    const filme = await this.findFilmeById(idFilme);
    
    try {

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
      throw new InternalServerErrorException(
        'Erro ao atualizar um filme',
      );
    }
  }

  async delete (idFilme: number) {
    const filme = await this.findFilmeById(idFilme);

    try {
      await filme.remove();

      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao remover um filme',
      );
    }
  }
}
