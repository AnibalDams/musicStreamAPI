import type { Request, Response } from "express";
import User from "../../classes/User";

export default async function login(req:Request, res:Response) {
    try {
        const { email, password} = req.body
        const login =await User.login(email, password)    

        return res.status(login.statusCode).json(login)
    } catch (error:any) {
        console.error(error)
        res.status(500).json({message:error.message, error:true})
    
    }

}