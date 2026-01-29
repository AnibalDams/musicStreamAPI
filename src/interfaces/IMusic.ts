export default interface IMusic {
    name:string
    artist:string // User id
    cover:string
    audio:string
    createdAt?:Date
    updatedAt?:Date
    tags:string[]
    albumId?:string
    isPrivate:boolean
    views:number





}