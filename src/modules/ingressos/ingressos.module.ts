import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngressosController } from 'src/controllers/ingressos/ingressos.controller';
import { IngressoRepository } from 'src/domain/repositories/IngressoRepository.repositoty';
import { IngressosService } from 'src/services/ingressos/ingressos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IngressoRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [IngressosController],
  providers: [IngressosService],
  exports: [PassportModule]
})
export class IngressosModule {}
