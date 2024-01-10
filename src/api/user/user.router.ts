import { NextFunction, Request, Response, Router } from 'express';
import { ROUTES } from '../../utils/constants';
import { Routes } from '../../utils/interfaces/routes.interface';
import { UserController } from './user.controller';
import { UserRole } from '@prisma/client';
import validationMiddleware from '../../utils/middlewares/validation.middleware';
import { roleMiddleware } from '../../utils/middlewares/role.middleware';
import { UserRoleDto } from './dtos/user.dto';
import { authMiddleware } from '../../utils/middlewares/auth.middleware';

class UserRouter implements Routes {
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get(ROUTES.user.getAllUsers, authMiddleware, this.getAllUsers);
    this.router.get(
      ROUTES.user.getUsersByRole,
      authMiddleware,
      validationMiddleware(UserRoleDto, 'params'),
      this.getUsersByRole,
    );
  };

  private getUsersByRole = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { role } = req.params;
      const response = await this.userController.getUsersByRole(
        role as UserRole,
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  private getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const response = await this.userController.getAllUsers();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default UserRouter;
