import { EntityRepository, Repository } from "typeorm";
import { Filmes } from "../entities/filmes.entity";

@EntityRepository(Filmes)
export class FilmesRepository extends Repository<Filmes> {

}