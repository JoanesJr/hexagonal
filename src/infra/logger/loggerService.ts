// src/infra/logger/LoggerService.ts
import { env } from '@/shared/config/env';
import pino, { Logger as PinoLogger } from 'pino';

export interface ILoggerService {
  info(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
  debug(message: string, meta?: Record<string, unknown>): void;
}

export class LoggerService implements ILoggerService {
  private logger: PinoLogger;

  constructor() {
    this.logger = pino({
      transport: {
        targets: [
          {
            target: "pino-loki",
            level:  'debug',
            options: {
              batching: false,
              labels: {
                app: 'hexagonal',
                namespace: env.NODE_ENV || 'development',
                source: "pino",
                runtime: `nodejs/${process.version}`
              },
              host: env.LOKI_URL || "http://localhost:3100",
            }
          },
        ],
        options: {
          colorize: true,
          translateTime: 'yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
        },
      },
      level: process.env.NODE_ENV === 'test' ? 'silent' : 'debug',
    });
  }

  info(message: string, meta?: Record<string, unknown>) {
    this.logger.info(meta ?? {}, message);
  }

  error(message: string, meta?: Record<string, unknown>) {
    this.logger.error(meta ?? {}, message);
  }

  debug(message: string, meta?: Record<string, unknown>) {
    this.logger.debug(meta ?? {}, message);
  }
}
