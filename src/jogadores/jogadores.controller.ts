import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create_players.dto';
import { UpdatePlayerDto } from './dtos/update_player.dto';
import { jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoPipes } from './pipes/Jogadores-validacao.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Get()
  async handlePlayers(): Promise<jogador[]> {
    return await this.jogadoresService.consultAll();
  }

  @Get('/:_id')
  async handleOnePlayer(
    @Param('_id', JogadoresValidacaoPipes) _id: string,
  ): Promise<jogador> {
    return await this.jogadoresService.consultOrId(_id);
  }

  @Delete('/:_id')
  async deletePlayer(
    @Param('_id', JogadoresValidacaoPipes) _id: string,
  ): Promise<void> {
    this.jogadoresService.deletePlayer(_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(
    @Body() creatPlayerDto: CreatePlayerDto,
  ): Promise<jogador> {
    return await this.jogadoresService.createPlayer(creatPlayerDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() updatePlayersDto: UpdatePlayerDto,
    @Param('_id', JogadoresValidacaoPipes) _id: string,
  ): Promise<void> {
    await this.jogadoresService.updatePlayer(_id, updatePlayersDto);
  }
}
