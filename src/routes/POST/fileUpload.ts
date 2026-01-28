import type { Request, Response } from "express";

export default async function fileUploader(req: Request, res: Response) {
  if (req.file) {
    res.status(200).json({
      message: "File uploaded successfully",
      filename: req.file.filename,
      originalname: req.file.originalname,
      destination: req.file.destination,
      url: `/static/${req.file.filename}`,
    });
  } else {
    res.status(400).json({ message: "No file uploaded", error:true });
  }
}
