import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngressosController } from 'src/controllers/ingressos/ingressos.controller';
import { IngressoRepository } from 'src/domain/repositories/IngressoRepository.repositoty';
import { IngressosService } from 'src/services/ingressos/ingressos.service';

@Module({
  imports: [TypeOrmModule.forFeature([IngressoRepository])],
  controllers: [IngressosController],
  providers: [IngressosService],
})
export class IngressosModule {}
