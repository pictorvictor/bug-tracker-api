import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { ROUTES } from '../../utils/constants';
import { LoginReqDto } from './dtos/login.dto';
import { loginUser, getMyProfile } from './auth.service';
import { UserInfo } from '../../utils/interfaces/auth.interface';

@Route('api')
@Tags('Auth')
export class AuthController extends Controller {
  @Post(ROUTES.auth.login)
  login(@Body() loginDto: LoginReqDto) {
    return loginUser(loginDto);
  }

  @Security('token')
  @Get(ROUTES.auth.myProfile)
  getMyProfile(@Request() reqUser: UserInfo) {
    return getMyProfile(reqUser);
  }
}
