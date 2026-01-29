import type IAlbum from "../interfaces/IAlbum";
import type IReturn from "../interfaces/IReturn";
import verifyFields from "../libs/fieldsVerifier";
import AlbumModel from "../models/Album.model";

export default class Album {
  private albumData: IAlbum;
  constructor(albumData: IAlbum) {
    this.albumData = albumData;
  }

  async create(): Promise<IReturn> {
    try {
      const { name, artist, cover, tags, description } = this.albumData;
      if (!verifyFields([name, artist, cover, tags, description])) {
        return {
          message: "All fields are required",
          statusCode: 400,
          error: true,
        };
      }
      const newAlbum = new AlbumModel(this.albumData);
      await newAlbum.save();
      return {
        message: "Album created successfully",
        statusCode: 201,
        album: newAlbum,
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
  static async getUserPublicAlbum(userId: string): Promise<IReturn> {
    try {
      const userAlbum = await AlbumModel.find({
        artist: userId,
        isPrivate: false,
      });
      if (userAlbum.length === 0) {
        return {
          message: "No album found",
          statusCode: 404,
          error: true,
        };
      }
      return {
        message: "Album found",
        statusCode: 200,
        album: userAlbum,
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
  static async getAlbumById(albumId: string): Promise<IReturn> {
    try {
      const album = await AlbumModel.findById(albumId);
      if (!album) {
        return {
          message: "Album not found",
          statusCode: 404,
          error: true,
        };
      }
      await AlbumModel.findByIdAndUpdate(albumId, { $inc: { views: 1 } });
      return {
        message: "Album found",
        statusCode: 200,
        album: album,
        error: false,

      }

    } catch (error: any) {
      return {
        message: error.message,
        statusCode: 500,
        error: true,}
    }}
  static async getPopularAlbum(): Promise<IReturn> {
    try{
      const popularAlbum = await AlbumModel.find({isPrivate:false}).sort({views:-1}).limit(10)
      if(popularAlbum.length===0){
        return{
          message:"No popular album found",
          statusCode:404,
          error:true
        }
      }
      return{
        message:"Popular album found",
        statusCode:200,
        album:popularAlbum,
        error:false
      }
    }
    catch(error:any){
    return{
      message:error.message,
      statusCode:500,
      error:true
    }
    }
  }
}
