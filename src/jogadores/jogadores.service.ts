import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create_players.dto';
import { UpdatePlayerDto } from './dtos/update_player.dto';
import { jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('jogadores') private readonly jogadorModel: Model<jogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<jogador> {
    const { email } = createPlayerDto;

    const foundePlayer = await this.jogadorModel.findOne({ email }).exec();

    if (foundePlayer) {
      throw new BadRequestException(
        `Jogado com o email ${email} já cadastrado`,
      );
    }

    const createPlayer = new this.jogadorModel(createPlayerDto);
    return await createPlayer.save();
  }

  async updatePlayer(
    _id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<void> {
    const foundePlayer = await this.jogadorModel.findOne({ _id }).exec();

    if (!foundePlayer) {
      throw new NotFoundException(`Jogador com o id ${_id} não encontrado`);
    }

    await this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: updatePlayerDto })
      .exec();
  }

  async consultAll(): Promise<jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultOrId(_id: string): Promise<jogador> {
    const foundePlayer = await this.jogadorModel.findOne({ _id }).exec();

    if (!foundePlayer) {
      throw new NotFoundException(`Player with id ${_id} no found`);
    }
    return foundePlayer;
  }

  async deletePlayer(_id: string) {
    const foundePlayer = await this.jogadorModel.findOne({ _id }).exec();

    if (!foundePlayer) {
      throw new NotFoundException(`Jogador com o id ${_id} não encontrado`);
    }
    return await this.jogadorModel.deleteOne({ _id }).exec();
  }
}
