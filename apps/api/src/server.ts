import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express, { type Express, type RequestHandler } from 'express';
import morgan from 'morgan';

export const createServer = (): Express => {
  const app = express();

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors());

  const messageHandler: RequestHandler = (req, res) => {
    res.json({ message: `hello ${req.params.name}` });
  };

  const statusHandler: RequestHandler = (_, res) => {
    res.json({ ok: true });
  };

  app.get('/message/:name', messageHandler);
  app.get('/status', statusHandler);

  return app;
};
