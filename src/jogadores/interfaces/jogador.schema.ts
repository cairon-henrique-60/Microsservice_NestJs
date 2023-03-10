import * as mongoose from 'mongoose';

export const jogadorSchema = new mongoose.Schema(
  {
    name: String,
    ranking: String,
    positionRanking: Number,
    urlPhotoPlayer: String,
    phoneNumber: String,
    email: { type: String, unique: true },
  },
  { timestamps: true, collection: 'jogadores' },
);
