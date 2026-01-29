import type IAlbum from "./IAlbum"
import type IMusic from "./IMusic"
import type IPlaylist from "./IPlaylist"
import type IUser from "./IUser"

export default interface IReturn {
    message:string
    statusCode:number
    error:boolean
    user?:IUser|IUser[]
    token?:string
    music?:IMusic|IMusic[]
    album?:IAlbum|IAlbum[]
    playlist?:IPlaylist|IPlaylist[]





}