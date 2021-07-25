import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class TrimRequestStringsMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    for (const key in req.body) if (typeof req.body[key] === "string") req.body[key] = req.body[key].trim();
    for (const key in req.query) if (typeof req.query[key] === "string") req.query[key] = (req.query[key] as string).trim();

    next();
  }
}
