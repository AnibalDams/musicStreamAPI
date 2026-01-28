import { Router } from "express";

import newUser from "./POST/newUser";
import login from "./POST/login";

import fileUploader from "./POST/fileUpload";
import upload from "../libs/middleware/fileUploader";
import auth from "../libs/middleware/authMiddleware";
import newMusic from "./POST/newMusic";
import getUserPublicMusic from "./GET/getUserMusic";


const router = Router();

router.get("/music/user/:userId/public", auth, getUserPublicMusic)


router.post("/file/upload", upload.single("file"), fileUploader);

router.post("/music/new", auth,newMusic)

router.post("/user/new", newUser)
router.post("/user/login", login)



export default router