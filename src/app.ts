import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { LOG_FORMAT, NODE_ENV, PORT } from './utils/env';
import { errorMiddleware } from './utils/middlewares/error.middleware';
import { logger, stream } from './utils/logger';
import { Routes } from './utils/interfaces/routes.interface';
import { prisma } from './prisma';

export class App {
  public app: Application;
  public env: string;
  public port: number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV;
    this.port = PORT;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.connectDatabase();
  }

  public listen = () => {
    this.app.listen(this.port, () => {
      logger.info(`Bug Tracker API ENV ${this.env}`);
      logger.info(`Bug Tracker API PORT ${this.port}`);
    });
  };

  private initializeMiddlewares = () => {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors());
    // this.app.use(helmet());
    this.app.use(express.json());
  };

  private initializeRoutes = (routes: Routes[]) => {
    routes.forEach((route) => {
      this.app.use('/api', route.router);
    });
  };

  private initializeSwagger = () => {
    this.app.use(
      '/docs',
      swaggerUi.serve,
      async (_req: Request, res: Response) => {
        return res.send(
          swaggerUi.generateHTML(await import(__dirname + '/swagger.json'), {
            swaggerOptions: { persistAuthorization: true },
          }),
        );
      },
    );
  };

  private connectDatabase = async () => {
    prisma
      .$connect()
      .then(() => {
        logger.info('Database connected');
      })
      .catch(() => {
        logger.error('Database failed to connect');
      });
  };

  private initializeErrorHandling = () => {
    this.app.use(errorMiddleware);
  };
}
