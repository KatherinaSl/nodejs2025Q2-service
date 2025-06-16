import { ArgumentsHost, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logs.service';
import { UnexpectedErrorFilter } from 'src/errors/exceptionFilter';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private loggingService: LoggingService,
    private exceptionFilter: UnexpectedErrorFilter,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, body, query } = req;

    const logMsg =
      `REQUEST URL: ${originalUrl}, ` +
      `Body: ${JSON.stringify(body)}, ` +
      `Query: ${JSON.stringify(query)} `;

    this.loggingService.log(logMsg);

    res.on('finish', () => {
      const { statusCode } = res;
      const logMsg = `RESPONSE URL: ${originalUrl}, Status: ${statusCode}`;
      this.loggingService.log(logMsg);
    });

    res.on('error', (error) => {
      const host = {
        switchToHttp: () => ({
          getRequest: () => req,
          getResponse: () => res,
        }),
      } as ArgumentsHost;

      this.exceptionFilter.catch(error, host);
    });

    next();
  }
}
