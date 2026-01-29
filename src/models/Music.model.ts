import { model, Schema } from "mongoose";
import type IMusic from "../interfaces/IMusic";

const MusicSchema = new Schema<IMusic>({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  cover: { type: String, required: true },
  audio: { type: String, required: true },
  tags: { type: [String], required: true },
  albumId: { type: String, default: null },
  isPrivate: { type: Boolean, default: false},
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model<IMusic>("Music", MusicSchema);
