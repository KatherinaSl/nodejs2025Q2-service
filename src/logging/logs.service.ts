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
      transports: [
        new winston.transports.DailyRotateFile({
          dirname: `logs/`,
          filename: 'log.log',
          level: 'info',
          maxSize: Number(process.env.MAX_LOG_SIZE) * 1024,
        }),
        new winston.transports.DailyRotateFile({
          dirname: `logs/`,
          filename: 'error.log',
          level: 'error',
          maxSize: Number(process.env.MAX_LOG_SIZE) * 1024,
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.log('info', message);
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error('error', message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn('warn', message, { context });
  }
}
