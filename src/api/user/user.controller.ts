import { Controller, Get, Route, Security, Tags, Request, Query } from 'tsoa';
import { UserRole } from '@prisma/client';
import { ROUTES } from '../../utils/constants';
import { getAllUsers } from './user.service';

@Route('api')
@Tags('User')
export class UserController extends Controller {
  @Get(ROUTES.user.getAllUsers)
  @Security('token')
  getAllUsers(@Query() role: UserRole) {
    return getAllUsers(role);
  }
}
