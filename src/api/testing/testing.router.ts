import { NextFunction, Request, Response, Router } from 'express';
import { ROUTES } from '../../utils/constants';
import { TestingController } from './testing.controller';
import { Routes } from '../../utils/interfaces/routes.interface';

class TestingRouter implements Routes {
  public path = '/testing';
  public router = Router();
  public testingController = new TestingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get(ROUTES.testing.healthCheck, this.getHealthCheck);
  };

  private getHealthCheck = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await this.testingController.getHealthCheck();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default TestingRouter;
