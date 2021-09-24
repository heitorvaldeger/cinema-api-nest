import { Salas } from "./entities/salas.entity";

export class Filme {
  horario: string;
  titulo: string;
  descricao: string;
  sinopse: string;
  genero: string;
  isAtivo: boolean;
  classificacaoIdade: number;
  sala: Salas;
}