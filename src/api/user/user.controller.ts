import { Body, Controller, Post, Route, Security, Tags } from 'tsoa';
import { ROUTES } from '../../utils/constants';
import { createTeamMember } from './user.service';
import { CreateTeamMemberReqDto } from './dtos/create-team-member.dto';

@Route('api')
@Tags('User')
export class UserController extends Controller {
  @Post(ROUTES.user.createTeamMember)
  @Security('token')
  createTeamMember(@Body() body: CreateTeamMemberReqDto) {
    return createTeamMember(body);
  }
}
