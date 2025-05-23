import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { Role } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
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

  @Role('GERENTE')
  @UseGuards(AuthGuard(), RolesGuard)
  @Post()
  async create (
    @Body(ValidationPipe) filmeModel: Filmes
  ) : Promise<Filmes> {
    const filme = await this.filmesService.create(filmeModel);

    return filme;
  }

  @Role('GERENTE')
  @UseGuards(AuthGuard(), RolesGuard)
  @Put(':idFilme')
  async update (
    @Param('idFilme') idFilme: number,
    @Body(ValidationPipe) filmeModel: Filmes
  ) {
    const filme = await this.filmesService.update(filmeModel, idFilme);

    return filme;
  }

  @Role('GERENTE')
  @UseGuards(AuthGuard(), RolesGuard)
  @Delete(':idFilme')
  async delete(
    @Param('idFilme') idFilme: number,
    @Res() res: Response
  ) {
    const deleted = await this.filmesService.delete(idFilme);

    if(deleted) {
      res.status(HttpStatus.OK).send({
        message: 'Filme removido com sucesso'
      });
    }
    else {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: 'Filme não foi removido com sucesso'
      });
    }
  }
}
