import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type IAuthenticatedRequest from "../../interfaces/IAuthenticatedRequest";

export default async function auth(
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.statusCode = 403;
      res.json({ message: "This routes requires authentication", error:true});
      return;
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      res.statusCode = 401;
      res.json({ message: "Unauthorized", error:true });
      return;
    }
    req.user = decoded;
    next();
  } catch (error: any) {
    res.statusCode = 500;
    res.json({ message: error.message, error:true  });
  }
}