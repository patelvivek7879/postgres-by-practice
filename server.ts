
import express, { Express, Request, Response , Application, NextFunction } from 'express';
import dotenv from 'dotenv';
import pingRouter from './routes/ping';
import usersRoutes from './routes/users';
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs';
import cors from 'cors';
import runQuery from './routes/run-query';
import { connectToDatabase } from './utils/db-connection';
import authRoutes, { googlePassportStrategy, localPassportStrategy } from './routes/auth';
import passport from 'passport';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import { prisma } from './repository/User';
import session from 'express-session';
import path from 'path';


const swaggerDocument = YAML.load('./swagger.yaml');


//reading env variables from env file
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(cors())
// app.use(cors({
//   origin:"http://localhost:3100",
//   methods:"GET,POST,PUT,DELETE",
//   credentials:true
// }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(
    expressSession({
        secret: 'keyboard cat',
        proxy: true,
        rolling: true,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // in ms
            secure: 'auto',
            httpOnly: true,
            sameSite: 'lax',
        },
        resave: false,
        saveUninitialized: false,
    }),
);


passport.use(localPassportStrategy);
passport.use(googlePassportStrategy);

app.use(session({ secret: process.env.SESSION_SECRET as string, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user: any, done) => {
  // On login (user changes), user.userUuid is written to the session store in the `sess.passport.data` field
  done(null, user);
});

// Before each request handler we read `sess.passport.user` from the session store
passport.deserializeUser(async (loggedInUser: any, done) => {
  // Convert to a full user profile
  try {
      const user = await prisma.users.findFirst({
        where: {
          user_id: loggedInUser.user_id,
        },
      });

      // Store that user on the request (`req`) object
      done(null, user);
  } catch (e) {
      done(e);
  }
});

// Routes 
app.use(authRoutes);

app.use(pingRouter);
app.use(runQuery);
app.use(usersRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  express.static(path.join(__dirname, 'public'), {
      setHeaders: () => ({
          // private - browsers can cache but not CDNs
          // no-cache - caches must revalidate with the origin server before using a cached copy
          'Cache-Control': 'no-cache, private',
      }),
  }),
);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), {
      headers: { 'Cache-Control': 'no-cache, private' },
  });
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
  connectToDatabase()
});