import { Document } from 'mongoose';

export interface jogador extends Document {
  readonly phoneNumber: string;
  readonly email: string;
  name: string;
  ranking: string;
  poisitonRanking: number;
  urlPhotoPlayer: string;
}
