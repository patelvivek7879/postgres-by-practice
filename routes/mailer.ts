import express, {
  Express,
  Request,
  Response,
  Application,
  NextFunction,
} from "express";
import { mustBeAuthenticated } from "../middleware/authetication";

import nodemailer from "nodemailer";
import { logger } from "../utils/logger";
import { User } from "../types/User";

const router = express.Router();

router.post("/api/v1/sendMail", mustBeAuthenticated ,async (req: Request, res: Response) => {
  const { message } = req.body;
  const { accesstoken, email } = req.user as User;

  try {
  let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    user: 'patelvivek7879@gmail.com',
    accessToken: process.env.GMAIL_AUTH_TOKEN,
  },
},{
  to: email,
});

    const mailOptions = {
      from: email,
      subject: "Test",
      text: `${message}`,
    };

    await transporter.sendMail({...mailOptions});

    res.status(200).json({
      status: 200,
      message: "Mail sent successfully",
    });

  } catch (error) {
    logger.error(error);
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
});

export default router;
