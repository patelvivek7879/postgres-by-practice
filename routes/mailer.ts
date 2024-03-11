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

const router = express.Router();

router.post("/api/v1/sendMail", async (req, res) => {
    console.log(req)
  const { message } = req.body;

  try {

  let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
});


    const mailOptions = {
      from: {
        name: 'Vivek Patel',
        address: "vivekpatel.proxy@gmail.com"
        },
      to: "patelvivek7879@gmail.com",
      subject: "Test",
      text: `${message}`,
    };

    await transporter.sendMail({...mailOptions});

    res.status(200).json({
      status: 200,
      message: "Mail sent successfully",
    });

  } catch (error) {
    console.log("444444 44444 4444");
    logger.error(error);
    res.status(200).json({
      status: 200,
      message: "Message sent successfully",
    });
  }
});

export default router;
