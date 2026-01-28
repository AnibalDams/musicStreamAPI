import { model, Schema } from "mongoose";
import type IUser from "../interfaces/IUser";


const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: true },
    backgroundImage: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    adminStatus: { type: Boolean, default: false },
    password: { type: String, required: true },
    isArtist: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export default model<IUser>("User", UserSchema);
