import 'reflect-metadata'
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'
import { errors } from 'celebrate'
import 'express-async-errors'

import routes from './routes';
import rateLimiter from './middlewares/rateLimiter';
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'

import '@shared/container'
import '@shared/infra/typeorm'

const app = express();

app.use(cors())
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(rateLimiter)
app.use(routes);

app.use(errors())

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(3333, () => {
  console.log('🚀Server started on port 3333!');
});
