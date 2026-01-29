import type { Request, Response } from "express";
import Music from "../../classes/Music";

export default async function getMusicById(req:Request, res:Response){
    try{
        const {musicId} = req.params as {musicId:string}
        const music = await Music.getMusicById(musicId)
        return res.status(music.statusCode).json(music)
    }
    catch(error:any){
        console.error(error)
        res.status(500).json({message:error.message, error:true})
    }

}