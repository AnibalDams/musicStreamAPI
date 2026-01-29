export default interface IAlbum{
    name:string
    artist:string
    cover:string
    tags:string[]
    description:string
    isPrivate:boolean
    views:number
    createdAt:Date
    updatedAt:Date
}