import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { SalasModule } from './modules/salas/salas.module';
import { FilmesModule } from './modules/filmes/filmes.module';
import { UsersModule } from './modules/users/users.module';
import { IngressosModule } from './modules/ingressos/ingressos.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), SalasModule, FilmesModule, UsersModule, IngressosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
