import type IReturn from "../interfaces/IReturn";
import verifyFields from "../libs/fieldsVerifier";
import UserModel from "../models/User.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class User {
  username: string;
  email: string;
  avatar: string;
  backgroundImage: string;
  password: string;
  isArtist: boolean;

  constructor(
    username: string,
    email: string,
    avatar: string,
    backgroundImage: string,
    password: string,
    isArtist: boolean,
  ) {
    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.backgroundImage = backgroundImage;
    this.password = password;
    this.isArtist = isArtist;
  }

 async new(): Promise<IReturn> {
    try {
      if (
        !verifyFields([
          this.username,
          this.email,
          this.avatar,
          this.backgroundImage,
          this.password,
        ])
      ) {
        return {
          message: "All fields are required",
          statusCode: 400,
          error: true,
        };
      }
      const verifyUserEmail = await UserModel.findOne({ email: this.email });
      if (verifyUserEmail) {
        return {
          message: "User with this email already exists",
          statusCode: 400,
          error: true,
        };
      }
      const verifyUsername = await UserModel.findOne({
        username: this.username,
      });
      if (verifyUsername) {
        return {
          message: "User with this username already exists",
          statusCode: 400,
          error: true,
        };
      }
      const password = await bcrypt.hash(this.password, 10);
      const newUserData = {
        username: this.username,
        email: this.email,
        avatar: this.avatar,
        backgroundImage: this.backgroundImage,
        password: password,
        isArtist: this.isArtist,
      };
      const newUser = new UserModel(newUserData);
      await newUser.save();
      return {
        message: "User created successfully",
        statusCode: 201,
        user: newUser,
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
 static async login(email:string,password:string): Promise<IReturn> {
    try {
      if (!verifyFields([email, password])) {
        return {
          message:"All fields are required",
          statusCode:400,
          error:true
        
        } 
      }
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return {
          message: "User not found",
          statusCode: 404,
          error: true,
        };
      }
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return {
          message: "Invalid password",
          statusCode: 401,
          error: true,
        };
      }
      const token = jwt.sign(
        { _id: user._id, username:user.username, email: user.email, isAdmin:user.isAdmin },
        process.env.JWT_SECRET as string,
      );
      return {
        message: "User logged in successfully",
        statusCode: 200,
        user: user,
        token: token,
        error:false
      }

    }catch(error:any){
      return{
        message:error.message,
        statusCode:500,
        error:true
      }
    }
    }
}
