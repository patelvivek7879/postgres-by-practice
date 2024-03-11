import { User } from "./../types/User";
import express, { NextFunction, Request, Response } from "express";
import qs from "querystring";
import config from "config";
import axios from "axios";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../repository/User";
import passport, { session } from "passport";
import { Strategy as PassportGoogleStrategy } from 'passport-google-oauth20';

const router = express.Router();

// Passport login strategy

const getUsernameFromEmail = (email: string) => {
  return email.split("@")[0];
};

async function passportGoogleStrategyHandler(
  req: Request,
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: any
) {
  try{

    // const { models, config, webhooks } = req;
  const {email, picture, name} = profile && profile._json;

  console.log("user profile ===>>> ",accessToken, refreshToken);

  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });

  console.log("user ===>>> ",user)

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
    if (user.picture !== picture) {
      const updatedUser = await prisma.users.update({
        data: {
          picture: picture,
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
          console.log(user.password, password);
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

// OIDC ISSUER PATH for Google account
// https://accounts.google.com/.well-known/openid-configuration


function handleGoogleCallback(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('google', {
    // successRedirect:  process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT,
  })(req, res, next);
}

// for now just define routes here
router.get("/api/v1/auth/google",passport.authenticate('google', { scope: ['profile email'] }),
  async (req: Request, res: Response) => {
    await console.log("google login request",req)
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
    console.log(" req ", req);
    await req.session.save((err: Error) => {
      if (err) {
        console.log(" error ", err);
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
  console.log(" === logout req ===", req);

  if (!req.session) {
    // return res.utils.data('signout', {});
    res.redirect("/pbyp/login");
  }
  req.session.destroy(function (err) {
    if (err) {
      console.error(err);
    }
    // res.utils.data('signout', {});
    res.redirect("/pbyp/login");
  });
});


router.get('/api/v1/user/profile', (req, res) => {
  // Check if user is authenticated
  if (req.isAuthenticated()) {
      // Access the logged-in user from the session
      const user = req.user;

      console.log(" user profile =====>>>> ",req.user)
      res.json({ user });
  } else {
      // User is not authenticated
      res.status(401).json({ message: 'Unauthorized' });
  }
});

export default router;
