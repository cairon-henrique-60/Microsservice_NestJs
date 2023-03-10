import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import JogadoresModule from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Cairon:Emanuel1228@cursojs.2qwrjrn.mongodb.net/?retryWrites=true&w=majority',
    ),
    JogadoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
