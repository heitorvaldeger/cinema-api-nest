import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { Ingresso } from 'src/domain/entities/ingresso.entity';
import { IngressosService } from 'src/services/ingressos/ingressos.service';

@Controller('ingressos')
export class IngressosController {
  constructor (private ingressosService: IngressosService) {

  }

  @Post('comprar')
  async comprar (
    @Body(ValidationPipe) ingressoModel: Ingresso
  ) {
    const ingresso = await this.ingressosService.comprar(ingressoModel);

    return ingresso;
  }
}
