import express, {
  Express,
  Request,
  Response,
  Application,
  NextFunction,
} from "express";
import { mustBeAuthenticated } from "../middleware/authetication";
import fs from "fs";
import { logger } from "../utils/logger";
import { User } from "../types/User";
import { prisma } from "../repository/User";

const router = express.Router();

router.post(
  "/api/v1/feedback",
  mustBeAuthenticated,
  async (req: Request, res: Response) => {
    const { message, time, from } = req.body;
    const { email, name } = req.user as User;

    try {
      const feedbackBody: any = {
        message: message,
        from: email,
        name: name,
        createdAt: Date.now(),
      };

      const feedbackData = await prisma.feedbacks.create({
        data: feedbackBody,
      });

      res.status(200).json({
        status: 200,
        message: "Feedback sent successfully",
      });
    } catch (error) {
      console.error(" Error while inserting feedback ", error);
      res.status(500).json({
        status: 500,
        message: "Something went wrong",
      });
    }
  }
);

export default router;
