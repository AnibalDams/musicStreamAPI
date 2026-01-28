import type {  Response } from "express";
import Music from "../../classes/Music";
import type IMusic from "../../interfaces/IMusic";
import type IAuthenticatedRequest from "../../interfaces/IAuthenticatedRequest";

export default async function newMusic(req: IAuthenticatedRequest, res: Response) {
  try {
    const musicData = req.body as IMusic;
    musicData.artist = req.user?._id? req.user._id : "";
    const music = await new Music(musicData).create();
    return res.status(music.statusCode).json(music);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message, error: true });
  }
}
