import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  async comprar (ingresso: Ingresso) {
    const { preco, sala, filme, user } = ingresso;

    const ingressoRepository = this.ingressoRepository.create();
    ingressoRepository.preco = preco;
    ingressoRepository.sala = sala;
    ingressoRepository.filme = filme;
    ingressoRepository.user = user;

    try {
      await ingressoRepository.save();

      return ingressoRepository;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao procurar o usuário no banco de dados',
      );
    }
  }
}
