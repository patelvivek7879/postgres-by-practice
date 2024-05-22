import { User } from "./../types/User";
import express, { NextFunction, Request, Response } from "express";
import qs from "querystring";
import config from "config";
import axios from "axios";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../repository/User";
import passport, { session } from "passport";
import { Strategy as PassportGoogleStrategy } from "passport-google-oauth20";
import { logger } from "../utils/logger";
import { mustBeAuthenticated } from "../middleware/authetication";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const router = express.Router();

// Passport login strategy

const getUsernameFromEmail = (email: string) => {
  return email.split("@")[0];
};

export async function passportGoogleStrategyHandler(
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: any
) {
  try {
    const { email, picture, name } = profile && profile._json;

    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      const createdUser = await prisma.users.create({
        data: {
          username: getUsernameFromEmail(email) as string,
          email: email,
          name: name,
          password: "",
          progress: 0,
          dob: null,
          picture: picture,
          accesstoken: accessToken,
          new_user: true,
        },
      });

      if (createdUser) {
        const user = await prisma.users.findFirst({
          where: {
            email: email,
          },
        });

        // When user in new
        const initProgressData = {
          user_email: email,
          qryngdt: 0,
          fltrngdt: 0,
          jns: 0,
          grpngdt: 0,
          sbqry: 0,
          mdfyngdt: 0,
          transactions: 0,
          mngngtblcol: 0,
          psqlcntrnts: 0,
          dttyps: 0,
        };

        await prisma.progress.create({
          data: initProgressData,
        });

        return done(null, user);
      }
      return done(null, createdUser);
    }

    if (user.email === email) {
      if (user.picture !== picture || user.accesstoken !== accessToken) {
        const updatedUser = await prisma.users.update({
          data: {
            picture: picture,
            accesstoken: accessToken,
            new_user: false,
          },
          where: {
            email: email,
          },
        });

        const userProgressModule = await prisma.progress.findUnique({
          where: {
            user_email: email,
          },
        });
        if (!userProgressModule) {
          const initProgressData = {
            user_email: email,
            qryngdt: 0,
            fltrngdt: 0,
            jns: 0,
            grpngdt: 0,
            sbqry: 0,
            mdfyngdt: 0,
            transactions: 0,
            mngngtblcol: 0,
            psqlcntrnts: 0,
            dttyps: 0,
          };

          await prisma.progress.create({
            data: initProgressData,
          });
        }

        return done(null, updatedUser);
      }
      return done(null, user);
    } else {
      return done(null, false, { message: "wrong email or password" });
    }
  } catch (err) {
    return done(
      null,
      false,
      { message: "Something went wrong" },
      `error: ${err}`
    );
  }
}

export const localPassportStrategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    try {
      try {
        const user = await prisma.users.findFirst({
          where: {
            email: email,
          },
        });

        if (!user) {
          return done(null, false, { message: "Incorrect email or password" });
        }

        if (user.email === email) {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect password." });
            }
          });
        } else {
          return done(null, false, { message: "Incorrect email or password" });
        }
      } catch (error) {
        return done(null, false, { message: "Something went wrong" });
      }
    } catch (e) {
      return done(e);
    }
  }
);

export const googlePassportStrategy = new PassportGoogleStrategy(
  {
    passReqToCallback: true,
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY as string,
    callbackURL: process.env.GOOGLE_REDIRECT_URI as string,

    // This option tells the strategy to use the userinfo endpoint instead
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo?alt=json",
  },
  passportGoogleStrategyHandler
);

function handleGoogleCallback(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("google", {
    // successRedirect:  process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT,
  })(req, res, next);
}

// for now just define routes here
router.get(
  "/api/v1/auth/google",
  passport.authenticate("google", { scope: ["profile email"] }),
  async (req: Request, res: Response) => {
    logger.info("google login request");
  }
);

router.get(
  "/api/v1/auth/google/callback",
  handleGoogleCallback,
  async (req, res) => {
    return res.redirect(process.env.SUCCESS_REDIRECT as string);
  }
);

router.get("/api/v1/flash", (req, res) => {
  res.json({
    status: "200",
    message: req.flash(""),
  });
});

router.post(
  "/api/v1/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
    failureFlash: true,
  }),
  async (req: any, res: Response, next: NextFunction) => {
    await req.session.save((err: Error) => {
      if (err) {
        next(err);
        logger.error(err);
        res.status(500).json({
          status: 500,
          user: null,
          message: err.message,
        });
      } else {
        res.status(200).json({
          status: 200,
          user: req.user,
        });
      }
    });
  }
);

router.post(
  "/api/v1/forgot-password",
  async (req: any, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(403).json({
        status: 403,
        message: "Email not registered",
      });
    }

    const token = jwt.sign(
      { id: user?.user_id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "5m" }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "patelvivek7879@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "patelvivek7879@gmail.com",
      to: email,
      subject: "Practice Postgres Reset Password",
      text: `${process.env.HOSTING_URL}pbyp/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).json({
          message: "Unable to send reset password link",
          status: 200,
        });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({
          message: "Sent link to registered email",
          status: 200,
        });
      }
    });
  }
);

router.post(
  "/api/v1/reset-password/:token",
  async (req: any, res: Response, next: NextFunction) => {
    const { token }: any = req.params;
    const { newPassword } = req.body;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

      const { id: user_id }: any = decoded;

      const user = await prisma.users.findUnique({
        where: {
          user_id,
        },
      });

      if (user) {
        const updatedUser = await prisma.users.update({
          where: {
            user_id,
          },
          data: {
            password: await bcrypt.hash(newPassword, 10),
          },
        });

        res.status(200).json({
          status: 200,
          user: updatedUser,
          message: "Password reset successfully",
        });
      }
    } catch (err: any) {
      res.status(500).json({
        status: 500,
        message: "Invalid token: " + err?.message,
      });
    }
  }
);

// Signup route
router.post("/api/v1/register", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  const existingUser = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  // Create new user
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) throw err;
    const newUser = {
      username: getUsernameFromEmail(email) as string,
      email: email,
      password: hash,
      name: `${firstname} ${lastname}`,
      progress: 0,
      dob: null,
    };
    const createdUser = await prisma.users.create({
      data: newUser,
    });
    res.status(201).json({ message: "User created successfully." });
  });
});

router.post("/api/v1/logout", function (req, res, next) {
  if (!req.session) {
    res.redirect("/pbyp/login");
  }
  req.session.destroy(function (err) {
    if (err) {
      logger.error(err);
    }
    res.redirect("/pbyp/login");
  });
});

router.get("/api/v1/user/profile", mustBeAuthenticated, (req, res) => {
  // Check if user is authenticated
  if (req.isAuthenticated()) {
    // Access the logged-in user from the session
    const user = req.user;
    res.json({ user });
  } else {
    // User is not authenticated
    res.status(401).json({ message: "Unauthorized" });
  }
});

export default router;
