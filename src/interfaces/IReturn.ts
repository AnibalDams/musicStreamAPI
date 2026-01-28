import type IUser from "./IUser"

export default interface IReturn {
    message:string
    statusCode:number
    error:boolean
    user?:IUser|IUser[]

}