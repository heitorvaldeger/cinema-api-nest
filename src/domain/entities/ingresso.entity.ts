import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Filmes } from "./filmes.entity";
import { Salas } from "./salas.entity";
import { User } from "./users.entity";

@Entity()
export class Ingresso extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'double',
    nullable: false
  })
  preco: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Salas, salas => salas.ingresso)
  sala: Salas

  @ManyToOne(() => Filmes, filmes => filmes.ingresso)
  filme: Filmes

  @ManyToOne(() => User, user => user.ingresso)
  user: User
}