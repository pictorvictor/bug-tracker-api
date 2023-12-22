import { NextFunction, Request, Response, Router } from 'express';
import { ROUTES } from '../../utils/constants';
import { Routes } from '../../utils/interfaces/routes.interface';
import { UserRole } from '@prisma/client';
import validationMiddleware from '../../utils/middlewares/validation.middleware';
import { roleMiddleware } from '../../utils/middlewares/role.middleware';
import { CreateProjectReqDto } from './dtos/create-project.dto';
import { ProjectController } from './project.controller';
import {
  RequestWithUser,
  UserInfo,
} from '../../utils/interfaces/auth.interface';

class ProjectRouter implements Routes {
  public router = Router();
  public projectController = new ProjectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post(
      ROUTES.project.createProject,
      roleMiddleware(UserRole.MP),
      validationMiddleware(CreateProjectReqDto, 'body'),
      this.createProject,
    );
  };

  private createProject = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const body = req.body;
      const user = req.user as UserInfo;
      const response = await this.projectController.createProject(user, body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default ProjectRouter;
