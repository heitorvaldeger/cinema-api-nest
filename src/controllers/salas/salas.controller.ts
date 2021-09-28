import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { Filmes } from 'src/domain/entities/filmes.entity';
import { Salas } from 'src/domain/entities/salas.entity';
import { SalasService } from 'src/services/salas/salas.service';

@Controller('salas')
export class SalasController {
  constructor (private salasService: SalasService) {

  }

  @Get()
  async findAll () : Promise<Salas[]> {
    const salas = await this.salasService.findAll();

    return salas;
  }

  @Get(':idSala/filmes')
  async findFilmesBySala (
    @Param('idSala') idSala: number
  ) : Promise<Filmes[]> {
    const filmes = await this.salasService.findFilmesBySala(idSala);

    return filmes;
  }

  @Post()
  async create (
    @Body(ValidationPipe) salaModel: Salas
  ) : Promise<Salas> {
    const sala = await this.salasService.create(salaModel);

    return sala;
  }

  @Put(':idSala')
  async update (
    @Param('idSala') idSala: number,
    @Body(ValidationPipe) salaModel: Salas
  ) {
    const sala = await this.salasService.update(salaModel, idSala);

    return sala;
  }

  @Delete(':idSala')
  async delete (
    @Param('idSala') idSala: number
  ) {
    const deleted = await this.salasService.delete(idSala);

    if (deleted) {
      return {
        message: 'Sala removida com sucesso'
      };
    }
    else {
      return {
        message: 'Sala não foi removida com sucesso'
      };
    }
  }
}
