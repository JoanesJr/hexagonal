import { PersonalError } from "@/shared/errors/Personal.error";
import { NextFunction, Request, Response } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof PersonalError) {
      return res.status(409).json({ status: "error", message: err.message });
    }
    console.error(err); // ou log externo
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }