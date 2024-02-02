import { Injectable } from '@nestjs/common';

import { stringifyError } from '../utils/stringify-error';

@Injectable()
export class LoggerService {
  public log(message: string, data?: object): void {
    const timestamp = Date.now();
    console.log(JSON.stringify({ message, data: data || {}, timestamp }));
  }

  public error(message: string, error?: unknown): void {
    const timestamp = Date.now();
    console.error(stringifyError({ message, error: error || {}, timestamp }));
  }
}
