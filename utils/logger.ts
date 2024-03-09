import pino from 'pino';

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