import { User } from "./../types/User";
import express, { NextFunction, Request, Response } from "express";
import qs from "querystring";
import config from "config";
import axios from "axios";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../repository/User";
import passport, { session } from "passport";
import { Strategy as PassportGoogleStrategy } from 'passport-google-oauth20';
import { logger } from "../utils/logger";
import { mustBeAuthenticated } from "../middleware/authetication";

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
  try{
  const {email, picture, name} = profile && profile._json;

  console.log("email===>>", email)

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
        accesstoken: accessToken
      },
    });

    if (createdUser) {
      const user = await prisma.users.findFirst({
        where: {
          email: email,
        },
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
          new_user: false
        },
        where: {
          email: email,
        },
      });
      return done(null, updatedUser);
    }
    return done(null, user);
  } else {
    return done(null, false, { message: "wrong email or password" });
  }
  }catch(err){
    return done(null, false, { message: "Something went wrong" }, `error: ${err}`);
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
          return done(null, false, { message: "User not registered!" });
        }

        if (user.email === email) {
          if (user.password === password) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect password" });
          }
        } else {
          return done(null, false, { message: "wrong email or password" });
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
    userProfileURL:
      'https://www.googleapis.com/oauth2/v3/userinfo?alt=json',
  },
  passportGoogleStrategyHandler
)

function handleGoogleCallback(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('google', {
    // successRedirect:  process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT,
  })(req, res, next);
}

// for now just define routes here
router.get("/api/v1/auth/google",passport.authenticate('google', { scope: ['profile email'] }),
  async (req: Request, res: Response) => {
     logger.info("google login request")
  }
);

router.get('/api/v1/auth/google/callback', handleGoogleCallback, async (req, res) =>{
  return res.redirect(process.env.SUCCESS_REDIRECT as string);
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
        logger.error(err);
        res.status(500).json({
          status: 500,
          user: null,
          message: err.message,
        });
      }
      res.status(200).json({
        status: 200,
        user: req.User,
      });
    });
  }
);

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


router.get('/api/v1/user/profile', mustBeAuthenticated, (req, res) => {
  // Check if user is authenticated
  if (req.isAuthenticated()) {
      // Access the logged-in user from the session
      const user = req.user;
      res.json({ user });
  } else {
      // User is not authenticated
      res.status(401).json({ message: 'Unauthorized' });
  }
});

export default router;
