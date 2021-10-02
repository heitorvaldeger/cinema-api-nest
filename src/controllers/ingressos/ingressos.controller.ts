import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Ingresso } from 'src/domain/entities/ingresso.entity';
import { IngressosService } from 'src/services/ingressos/ingressos.service';

@Controller('ingressos')
export class IngressosController {
  constructor (private ingressosService: IngressosService) {

  }

  @Role('CLIENTE')
  @UseGuards(AuthGuard(), RolesGuard)
  @Get(':idIngresso')
  async getInfoIngresso (
    @Param('idIngresso') idIngresso: number
  ) {
    const ingresso = await this.ingressosService.getInfoIngresso(idIngresso);

    return ingresso;
  }

  @Role('CLIENTE')
  @UseGuards(AuthGuard(), RolesGuard)
  @Post('comprar')
  async comprar (
    @Body(ValidationPipe) ingressoModel: Ingresso
  ) {
    const ingresso = await this.ingressosService.comprar(ingressoModel);

    return ingresso;
  }
}
