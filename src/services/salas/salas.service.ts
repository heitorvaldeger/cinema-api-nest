import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalasRepository } from 'src/models/repositories/SalasRepository.repository';
import { Sala } from 'src/models/sala.model';

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

  async create (salaModel: Sala) {
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
}
