import {Request, Response, NextFunction } from "express";

export const mustBeAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.isAuthenticated()) {
     return next();
    } else{
      return res.status(401).json({
        status: 401,
        message: "User not authenticated",
      });
    }
  };