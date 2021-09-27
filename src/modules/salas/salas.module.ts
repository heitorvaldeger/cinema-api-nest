import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalasRepository } from 'src/domain/repositories/SalasRepository.repository';
import { SalasService } from '../../services/salas/salas.service';
import { SalasController } from '../../controllers/salas/salas.controller';

// Conceito de Injeção de Dependência
@Module({
  imports: [TypeOrmModule.forFeature([SalasRepository])],
  providers: [SalasService],
  controllers: [SalasController]
})
export class SalasModule {}
