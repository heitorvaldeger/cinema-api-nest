import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { Filmes } from 'src/domain/entities/filmes.entity';
import { FilmesService } from 'src/services/filmes/filmes.service';

@Controller('filmes')
export class FilmesController {
  constructor (private filmesService: FilmesService) {

  }

  @Get(':idFilme')
  async findFilmeById(
    @Param('idFilme') idFilme: number
  ) {
    const filme = await this.filmesService.findFilmeById(idFilme);

    return filme;
  }

  @Post()
  async create (
    @Body(ValidationPipe) filmeModel: Filmes
  ) : Promise<Filmes> {
    const filme = await this.filmesService.create(filmeModel);

    return filme;
  }

  @Put(':idFilme')
  async update (
    @Param('idFilme') idFilme: number,
    @Body(ValidationPipe) filmeModel: Filmes
  ) {
    const filme = await this.filmesService.update(filmeModel, idFilme);

    return filme;
  }

  @Delete(':idFilme')
  async delete(
    @Param('idFilme') idFilme: number,
    @Res() res: Response
  ) {
    const deleted = await this.filmesService.delete(idFilme);

    if(deleted) {
      return {
        message: 'Filme removido com sucesso'
      };
    }
    else {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: 'Filme não foi removido com sucesso'
      });
    }
  }
}
