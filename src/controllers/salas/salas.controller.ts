import { Body, Controller, Get, Post } from '@nestjs/common';
import { Salas } from 'src/models/entities/salas.entity';
import { Sala } from 'src/models/sala.model';
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

  @Post()
  async create (
    @Body() salaModel: Sala
  ) : Promise<Salas> {
    const sala = await this.salasService.create(salaModel);

    return sala;
  }
}
