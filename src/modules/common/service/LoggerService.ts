import {ILoggerService} from './service.types';
import pino, {Logger} from 'pino';

export class PinoLoggerService implements ILoggerService {
  private pino: Logger;
  constructor() {
    this.pino = pino();
  }
  trace(str: string, ...args: any[]): void {
    this.pino.trace(str, ...args);
  }

  debug(str: string, ...args: any[]): void {
    this.pino.debug(str, ...args);
  }

  info(str: string, ...args: any[]): void {
    this.pino.info(str, ...args);
  }

  warn(str: string, ...args: any[]): void {
    this.pino.warn(str, ...args);
  }

  error(str: string, ...args: any[]): void {
    this.pino.error(str, ...args);
  }
}
