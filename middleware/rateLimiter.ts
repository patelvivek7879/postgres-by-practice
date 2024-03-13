import { NextFunction, Request, Response } from "express";
import RateLimit from "express-rate-limit";

const rateLimiter = RateLimit({
  handler: (req: any, res: Response, next: NextFunction) => {
    if (req?.rateLimit.remaining === 0) {
      return res.status(429).json({
        status: 429,
        message: "Too many requests, please try again later.",
      });
    } else {
      next();
    }
  },
  windowMs: 60 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

export { rateLimiter };
