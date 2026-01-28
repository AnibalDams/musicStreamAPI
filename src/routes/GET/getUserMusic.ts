import type { Request, Response } from "express";
import Music from "../../classes/Music";

export default async function getUserPublicMusic(req:Request, res:Response){
    try{
        const {userId} = req.params as {userId:string}
        const music = await Music.getUserPublicMusic(userId)
        return res.status(music.statusCode).json(music)
    }
    catch(error:any){
        console.error(error)
        res.status(500).json({message:error.message, error:true})
    }

}