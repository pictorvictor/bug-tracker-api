import { NextFunction, Request, Response, Router } from 'express';
import { ROUTES } from '../../utils/constants';
import { Routes } from '../../utils/interfaces/routes.interface';
import { UserController } from './user.controller';
import { UserRole } from '@prisma/client';
import validationMiddleware from '../../utils/middlewares/validation.middleware';
import { roleMiddleware } from '../../utils/middlewares/role.middleware';
import { UserRoleDto } from './dtos/user.dto';

class UserRouter implements Routes {
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.get(
      ROUTES.user.getAllUsers,
      roleMiddleware(UserRole.MP),
      validationMiddleware(UserRoleDto, 'query'),
      this.getAllUsers,
    );
  };

  private getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { role } = req.query;
      const response = await this.userController.getAllUsers(role as UserRole);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default UserRouter;
