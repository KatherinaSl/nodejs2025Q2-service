import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import 'dotenv/config';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private readonly logger: winston.Logger;

  constructor(context: string) {
    super(context);

    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.DailyRotateFile({
          dirname: `logs/`,
          filename: 'combined.log',
          level: 'info',
          maxSize: Number(process.env.MAX_LOG_SIZE) * 1024,
          maxFiles: 5,
        }),
        new winston.transports.DailyRotateFile({
          dirname: `logs/`,
          filename: 'error.log',
          level: 'error',
          maxSize: Number(process.env.MAX_LOG_SIZE) * 1024,
          maxFiles: 5,
        }),
        new winston.transports.Console(),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }
}
