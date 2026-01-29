import { Schema, model } from "mongoose";
import type IAlbum from "../interfaces/IAlbum";


const AlbumSchema = new Schema<IAlbum>({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    cover: { type: String, required: true },
    tags: { type: [String], required: true },
    description: { type: String, required: true },
    isPrivate: { type: Boolean, default: false},
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export default model<IAlbum>("Album", AlbumSchema);

