import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import serverless from 'serverless-http';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

let cachedHandler: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
  return serverless(server);
}

export default async function handler(req, res) {
  if (!cachedHandler) {
    cachedHandler = await bootstrap();
  }
  return cachedHandler(req, res);
}
