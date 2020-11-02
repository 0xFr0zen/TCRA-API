import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import EntityManager from './Server/orm/manager';
import Routes from './Server/utils/routes';
import fs from 'fs';
import path from 'path';

// process.on('warning', e => console.warn(e.stack));
createConnection()
  .then(async (connection) => {
    // First initialize the EntityManager-Repos for the Server
    await EntityManager.init(connection);
    // Create express app
    const app = express();
    app.use(express.json());
    app.use(
      cors({
        origin: '*',
      })
    );
    const evopRoute = express.Router({
      mergeParams: true,
      strict: true,
      caseSensitive: true,
    });
    // Register express routes from defined application routes
    Routes.forEach((route) => {
      (evopRoute as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result
              .then((result) =>
                result !== null && result !== undefined
                  ? res.send(result)
                  : undefined
              )
              .catch((lastError) => res.send(lastError));
          } else if (result) {
            res.json(result);
          }
        }
      );
    });
    app.use(evopRoute);
    app.get('/assets/:file(*)', (request: Request, response: Response) => {
      let p = path.join(
        process.cwd(),
        'src/Server/assets/',
        request.params.file
      );
      let maxP = path.join(process.cwd(), 'src/Server/assets/');
      let scope = path.relative(maxP, p);

      if (scope.split('..'.concat(path.sep)).length === 1) {
        response.sendFile(
          path.join(process.cwd(), 'src/Server/assets/', request.params.file)
        );
      } else {
        response.sendStatus(403);
      }
    });
    app.get('/', (request: Request, response: Response) => {
      response.send(
        fs
          .readFileSync(path.join(process.cwd(), 'src/Server/index.html'))
          .toString()
      );
    });
    // Start express server
    app.listen(3000);

    console.log(
      'Express server has started on port 3000. Open http://localhost:3000 to see results'
    );
  })
  .catch((error) => console.log(error));
