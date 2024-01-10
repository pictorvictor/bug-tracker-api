import { Controller, Get, Route, Security, Tags, Path } from 'tsoa';
import { UserRole } from '@prisma/client';
import { ROUTES } from '../../utils/constants';
import { getAllUsers, getUsersByRole } from './user.service';

@Route('api')
@Tags('User')
export class UserController extends Controller {
  @Get(ROUTES.user.getAllUsers)
  @Security('token')
  getAllUsers() {
    return getAllUsers();
  }

  @Get(ROUTES.user.getUsersByRole)
  @Security('token')
  getUsersByRole(@Path() role: UserRole) {
    return getUsersByRole(role);
  }
}
