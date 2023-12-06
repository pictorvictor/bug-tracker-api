import { NextFunction, Request, Response, Router } from 'express';
import { ROUTES } from '../../utils/constants';
import { Routes } from '../../utils/interfaces/routes.interface';
import { UserController } from './user.controller';
import { UserRole } from '@prisma/client';
import validationMiddleware from '../../utils/middlewares/validation.middleware';
import { roleMiddleware } from '../../utils/middlewares/role-middleware';
import { CreateTeamMemberReqDto } from './dtos/create-team-member.dto';

class UserRouter implements Routes {
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post(
      ROUTES.user.createTeamMember,
      roleMiddleware(UserRole.ADMIN),
      validationMiddleware(CreateTeamMemberReqDto, 'body'),
      this.createTeamMember,
    );
  };

  private createTeamMember = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const body = req.body;
      const response = await this.userController.createTeamMember(body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default UserRouter;
