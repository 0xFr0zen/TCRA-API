import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import EntityManager from './orm/manager';
import Routes from './utils/routes';

// process.on('warning', e => console.warn(e.stack));
createConnection()
  .then(async (connection) => {
    // First initialize the EntityManager-Repos for the Server
    await EntityManager.init(connection);
    // Create express app
    const app = express();
    app.use(express.json());
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

    // Start express server
    app.listen(3000);

    console.log(
      'Express server has started on port 3000. Open http://localhost:3000 to see results'
    );
  })
  .catch((error) => console.log(error));
