import { Router } from "express";

import newUser from "./POST/newUser";
import fileUploader from "./POST/fileUpload";
import upload from "../libs/fileUploader";

const router = Router();

router.post("/file/upload", upload.single("file"), fileUploader);

router.post("/user/new", newUser)



export default router