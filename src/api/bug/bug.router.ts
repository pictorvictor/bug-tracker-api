import { NextFunction, Request, Response, Router } from 'express';
import { ROUTES } from '../../utils/constants';
import { Routes } from '../../utils/interfaces/routes.interface';
import {
  RequestWithUser,
  UserInfo,
} from '../../utils/interfaces/auth.interface';
import { authMiddleware } from '../../utils/middlewares/auth.middleware';
import { BugController } from './bug.controller';
import { roleMiddleware } from '../../utils/middlewares/role.middleware';
import validationMiddleware from '../../utils/middlewares/validation.middleware';
import { ProjectIdDto } from '../project/dtos/project-id.dto';
import { BugIdDto } from './dtos/bug-id.dto';
import { UpdateBugDto } from './dtos/update-bug.dto';

class BugRouter implements Routes {
  public router = Router();
  public bugController = new BugController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get(
      ROUTES.bug.getProjectBugs,
      authMiddleware,
      validationMiddleware(ProjectIdDto, 'params'),
      this.getProjectBugs,
    );
    this.router.post(
      ROUTES.bug.createBug,
      roleMiddleware('TST'),
      validationMiddleware(ProjectIdDto, 'params'),
      this.createBug,
    );
    this.router.patch(
      ROUTES.bug.bug,
      authMiddleware,
      validationMiddleware(BugIdDto, 'params'),
      validationMiddleware(UpdateBugDto, 'body'),
      this.updateBug,
    );
  };

  private getProjectBugs = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.user as UserInfo;
      const { projectId } = req.params;
      const response = await this.bugController.getProjectBugs(user, projectId);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  private createBug = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.user as UserInfo;
      const { projectId } = req.params;
      const body = req.body;
      const response = await this.bugController.createBug(
        user,
        projectId,
        body,
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  private updateBug = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.user as UserInfo;
      const { bugId } = req.params;
      const body = req.body;
      const response = await this.bugController.updateBug(user, bugId, body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default BugRouter;
