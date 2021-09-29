import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingresso } from 'src/domain/entities/ingresso.entity';
import { IngressoRepository } from 'src/domain/repositories/IngressoRepository.repositoty';

@Injectable()
export class IngressosService {
  constructor (
    @InjectRepository(IngressoRepository)
    private ingressoRepository: IngressoRepository
  ) {

  }

  async getInfoIngresso (idIngresso: number) {
    try {
      const ingresso = await this.ingressoRepository.findOne({
        id: idIngresso
      });

      if (!ingresso) {
        throw new NotFoundException(
          {
            message: "Ingresso não encontrada"
          }
        );
      }

      const filme = await ingresso.filme;
      const user = await ingresso.user;
      const sala = await ingresso.sala;

      const ingressoData = {
        preco: ingresso.preco,
        filme: filme.titulo,
        user: user.nome,
        sala: sala.nome,
        horario: filme.horario
      };

      return ingressoData;
    } catch (error) {
      
    }
  }

  async comprar (ingresso: Ingresso) {
    const ingressoRepository = this.ingressoRepository.create(ingresso);

    try {
      await ingressoRepository.save();

      return ingresso;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao procurar o usuário no banco de dados',
      );
    }
  }
}
