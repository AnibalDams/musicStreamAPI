export default interface IUser {
    username:string
    email:string
    avatar:string
    backgroundImage:string
    isAdmin?:boolean
    adminStatus?:boolean
    password:string
    isArtist:boolean
    createdAt:Date
    updatedAt:Date
}
