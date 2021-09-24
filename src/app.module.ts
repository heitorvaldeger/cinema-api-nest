import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { SalasModule } from './modules/salas/salas.module';
import { FilmesModule } from './modules/filmes/filmes.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), SalasModule, FilmesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
