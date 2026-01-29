import {Schema, model} from "mongoose"
import type IPlaylist from "../interfaces/IPlaylist"

const PlaylistSchema = new Schema<IPlaylist>({
    name:{type:String, required:true},
    cover:{type:String, required:true},
    isPrivate:{type:Boolean, default:false},
    musics:{type:[String], default:[]},
    userId:{type:String, required:true},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now}

})

export default model<IPlaylist>("Playlist", PlaylistSchema)