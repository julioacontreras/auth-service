import Logger from '@ptkdev/logger';
import { LoggerOptions } from '@ptkdev/logger';

export let logger: Logger;

export function useLogger (loggerConfig: unknown): void {
    logger = new Logger(loggerConfig as LoggerOptions);
}
