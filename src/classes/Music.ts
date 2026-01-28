import type IMusic from "../interfaces/IMusic";
import type IReturn from "../interfaces/IReturn";
import MusicModel from "../models/Music.model";
import verifyFields from "../libs/fieldsVerifier";

export default class Music {
  private musicData: IMusic;
  constructor(musicData: IMusic) {
    this.musicData = musicData;
  }

  async create(): Promise<IReturn> {
    try {
      const { audio, cover, name, tags } = this.musicData;
      if (!verifyFields([audio, cover, name, tags])) {
        return {
          message: "All fields are required",
          statusCode: 400,
          error: true,
        };
      }
      const newMusic = new MusicModel(this.musicData);
      await newMusic.save();
      return {
        message: "Music created successfully",
        statusCode: 201,
        music: newMusic,
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
  static async getUserPublicMusic(userId: string): Promise<IReturn> {
    try {
      const userMusic = await MusicModel.find({ artist: userId, isPrivate: false });
      if (userMusic.length === 0) {
        return {
          message: "No music found",
          statusCode: 404,
          error: true,
        };
      }
      return {
        message: "Music found",
        statusCode: 200,
        music: userMusic,
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
