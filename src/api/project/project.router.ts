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
import { authMiddleware } from '../../utils/middlewares/auth.middleware';
import { ProjectIdDto } from './dtos/project-id.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

class ProjectRouter implements Routes {
  public router = Router();
  public projectController = new ProjectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post(
      ROUTES.project.projects,
      roleMiddleware(UserRole.MP),
      validationMiddleware(CreateProjectReqDto, 'body'),
      this.createProject,
    );
    this.router.get(
      ROUTES.project.projects,
      authMiddleware,
      this.getAllProjects,
    );
    this.router.post(
      ROUTES.project.enrollInProject,
      authMiddleware,
      validationMiddleware(ProjectIdDto, 'params'),
      this.enrollInProject,
    );
    this.router.patch(
      ROUTES.project.project,
      roleMiddleware(UserRole.MP),
      validationMiddleware(ProjectIdDto, 'params'),
      validationMiddleware(UpdateProjectDto, 'body'),
      this.updateProject,
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

  private getAllProjects = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.user as UserInfo;
      const response = await this.projectController.getAllProjects(user);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  private enrollInProject = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.user as UserInfo;
      const { projectId } = req.params;
      const response = await this.projectController.enrollInProject(
        user,
        projectId,
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };


  private updateProject = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const user = req.user as UserInfo;
      const { projectId } = req.params;
      const { body } = req;
      const response = await this.projectController.updateProject(
        user,
        projectId,
        body
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default ProjectRouter;
