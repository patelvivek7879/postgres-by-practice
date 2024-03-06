
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import pino from 'pino';
import pingRouter from './routes/ping';
import auth from './routes/auth';
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs';
import cors from 'cors';
import runQuery from './routes/run-query';
import config from 'config'
import { Client }   from "pg";
import { connectToDatabase } from './db-connection';

const swaggerDocument = YAML.load('./swagger.yaml');

export const logger = pino(
  {
    level: process.env.PINO_LOG_LEVEL || 'debug', // error, warn, info, fatal, debug
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  }
);

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json())
// app.use(cors())
app.use(cors({
  origin:"http://localhost:3100",
  methods:"GET,POST,PUT,DELETE",
  credentials:true
}));

// Routes 
app.use(pingRouter);

app.use(runQuery);
// app.use('/api/sessions/oauth/google/',auth);

app.get('/', (req: Request, res: Response) => {
  logger.info('Hello from Pino logger route /');
  res.send('Welcome to Express & TypeScript Server');
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
  connectToDatabase()
});