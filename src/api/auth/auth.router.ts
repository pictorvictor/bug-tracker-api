import { NextFunction, Request, Response, Router } from 'express';
import { ROUTES } from '../../utils/constants';
import { Routes } from '../../utils/interfaces/routes.interface';
import { AuthController } from './auth.controller';
import validationMiddleware from '../../utils/middlewares/validation.middleware';
import { LoginReqDto } from './dtos/login.dto';
import { authMiddleware } from '../../utils/middlewares/auth-middleware';
import {
  RequestWithUser,
  UserInfo,
} from '../../utils/interfaces/auth.interface';

class AuthRouter implements Routes {
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.router.post(
      ROUTES.auth.login,
      validationMiddleware(LoginReqDto, 'body'),
      this.login,
    );
    this.router.get(ROUTES.auth.myProfile, authMiddleware, this.getMyProfile);
  };

  private login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const response = await this.authController.login(body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  private getMyProfile = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { user } = req;
      const response = await this.authController.getMyProfile(user as UserInfo);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthRouter;
