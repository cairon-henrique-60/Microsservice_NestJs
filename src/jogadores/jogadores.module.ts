import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { jogadorSchema } from './interfaces/jogador.schema';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'jogadores', schema: jogadorSchema }]),
  ],
  controllers: [JogadoresController],
  providers: [JogadoresService],
})
export default class JogadoresModule {}
