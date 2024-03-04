
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import pino from 'pino';
import pingRouter from './routes/ping';
import auth from './routes/auth';
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs';
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
    //   redact: {
    //     paths: ['email'],
    //   }}
  }
);

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(express.json())

// Routes 
app.use(pingRouter);
app.use('/api/sessions/oauth/google/',auth);

app.get('/', (req: Request, res: Response) => {
  logger.info('Hello from Pino logger route /');
  res.send('Welcome to Express & TypeScript Server');
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});