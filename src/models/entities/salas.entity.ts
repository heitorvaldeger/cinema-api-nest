import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Filmes } from "./filmes.entity";

@Entity()
export class Salas extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    nullable: false
  })
  nome: string;

  @Column({
    type: 'int',
    nullable: false
  })
  limiteCadeiras: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Filmes, filmes => filmes.sala)
  filmes: Filmes[]
}
