import type { Request, Response } from "express";
import User from "../../classes/User";

export default async function newUser(req:Request, res:Response) {
    try {
        const {username, email, avatar, backgroundImage, password, isArtist} = req.body
        const user =await new User(username, email, avatar, backgroundImage, password, isArtist).new()    

        return res.status(user.statusCode).json({message:user.message, user:user.user})
    } catch (error:any) {
        console.error(error)
        res.status(500).json({message:error.message, error:true})
    
    }

}