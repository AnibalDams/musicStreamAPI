import type IPlaylist from "../interfaces/IPlaylist";
import type IReturn from "../interfaces/IReturn";
import verifyFields from "../libs/fieldsVerifier";
import PlaylistModel from "../models/Playlist.model";

export default class Playlist {
  playlistData: IPlaylist;
  constructor(playlistData: IPlaylist) {
    this.playlistData = playlistData;
  }

  async create(): Promise<IReturn> {
    try {
      const { name, cover } = this.playlistData;
      if (!verifyFields([name, cover])) {
        return {
          message: "All fields are required",
          statusCode: 400,
          error: true,
        };
      }
      const newPlaylist = new PlaylistModel(this.playlistData);
      await newPlaylist.save();
      return {
        message: "Playlist created successfully",
        statusCode: 201,
        playlist: newPlaylist,
        error: false,
      };
    } catch (error: any) {
      return {
        message: error.message,
        statusCode: 500,
        error: true,
      };
    }
  }
  static async getUserPlaylist(userId: string): Promise<IReturn> {
    try {
      const userPlaylist = await PlaylistModel.find({ userId: userId });
      if (userPlaylist.length === 0) {
        return {
          message: "No playlist found",
          statusCode: 404,
          error: true,
        };
      }
      return {
        message: "Playlist found",
        statusCode: 200,
        playlist: userPlaylist,
        error: false,
      };
    } catch (error: any) {
      return {
        message: error.message,
        statusCode: 500,
        error: true,
      };
    }
  }
}
