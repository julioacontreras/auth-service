import { Express } from 'express';

export interface App {
    server: Express,
    config: unknown,
    port: number,
}
