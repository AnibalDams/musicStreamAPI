import type { Response } from "express";
import type IAuthenticatedRequest from "../../interfaces/IAuthenticatedRequest";
import Playlist from "../../classes/Playlist";
import type IPlaylist from "../../interfaces/IPlaylist";

export default async function newPlaylist(
  req: IAuthenticatedRequest,
  res: Response,
) {
  try {
    const playlistData = req.body as IPlaylist;
    playlistData.userId = req.user?._id ? req.user._id : "";
    const playlist = await new Playlist(playlistData).create();
    return res.status(playlist.statusCode).json(playlist);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message, error: true });
  }
}
