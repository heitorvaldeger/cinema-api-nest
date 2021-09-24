import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Salas } from "./salas.entity";

@Entity()
export class Filmes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'time',
    nullable: false
  })
  horario: string

  @Column({
    nullable: false,
    length: 100
  })
  titulo: string

  @Column({
    nullable: false
  })
  sinopse: string

  @Column({
    nullable: false,
    length: 20
  })
  genero: string

  @Column({
    nullable: false,
    default: false
  })
  isAtivo: boolean

  @Column({
    nullable: false,
    type: 'int'
  })
  classificacaoIdade: number

  @ManyToOne(() => Salas, sala => sala.filmes)
  sala: Salas
}