import { Body, Controller, Post } from '@nestjs/common';
import { Filmes } from 'src/models/entities/filmes.entity';
import { Filme } from 'src/models/filme.model';
import { FilmesService } from 'src/services/filmes/filmes.service';

@Controller('filmes')
export class FilmesController {
  constructor (private filmesService: FilmesService) {

  }

  @Post()
  async create (
    @Body() filmeModel: Filme
  ) : Promise<Filmes> {
    const filme = await this.filmesService.create(filmeModel);

    return filme;
  }
}
