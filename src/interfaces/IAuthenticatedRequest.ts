import type { Request } from "express";

export default interface IAuthenticatedRequest extends Request{
    user?:{
        _id:string
        username:string
        email:string
        isAdmin:boolean
    }
}