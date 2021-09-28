import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Salas } from 'src/domain/entities/salas.entity';
import { SalasRepository } from 'src/domain/repositories/SalasRepository.repository';

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(SalasRepository)
    private salasRepository: SalasRepository
  ) {}

  async findAll() {
    try {
      const salas = await this.salasRepository.find();

      return salas;
    } catch (error) {
      
    }
  }

  async findFilmesBySala (idSala: number) {
    try {
      const sala = await this.findSalaById(idSala);

      return sala.filmes;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar os filmes de uma sala',
      );
    }
  }

  async findSalaById (idSala: number) {
    try {
      const sala = await this.salasRepository.findOne({
        id: idSala
      });

      if (!sala) {
        throw new NotFoundException(
          {
            message: "Sala não encontrada"
          }
        );
      }

      return sala;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar uma sala',
      );
    }
  }
  async create (salaModel: Salas) {
    const { nome, limiteCadeiras } = salaModel;

    // Abrir uma transação (nível banco de dados)
    const sala = this.salasRepository.create();

    sala.nome = nome;
    sala.limiteCadeiras = limiteCadeiras;

    try {
      await sala.save();

      // Commit
      return sala;
    } catch (error) {
      // Rollback
    }
  }

  async update (salaModel: Salas, idSala: number) {
    const { nome, limiteCadeiras } = salaModel;

    try {
      const sala = await this.findSalaById(idSala);

      sala.nome = nome;
      sala.limiteCadeiras = limiteCadeiras;

      await sala.save();

      return sala;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar uma sala',
      );
    }
  }

  async delete (idSala: number) : Promise<boolean> {
    try {
      const sala = await this.findSalaById(idSala);

      await sala.remove();

      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao remover uma sala',
      );
    }
  }
}
