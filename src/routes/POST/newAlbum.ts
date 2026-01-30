import type { Response } from "express";
import type IAuthenticatedRequest from "../../interfaces/IAuthenticatedRequest";
import Album from "../../classes/Album";
import type IAlbum from "../../interfaces/IAlbum";


export default async function newAlbum(req:IAuthenticatedRequest, res:Response){
    try {
        const albumData = req.body as IAlbum
        albumData.artist = req.user?._id? req.user._id : ""
        const album = await new Album(albumData).create()
        return res.status(album.statusCode).json(album)
    } catch (error:any) {
        console.error(error)
        res.status(500).json({message:error.message, error:true})
    
    }
}