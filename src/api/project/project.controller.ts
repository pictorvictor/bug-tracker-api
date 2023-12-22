import { Body, Controller, Request, Post, Route, Security, Tags } from 'tsoa';
import { ROUTES } from '../../utils/constants';
import { CreateProjectReqDto } from './dtos/create-project.dto';
import { UserInfo } from '../../utils/interfaces/auth.interface';
import { createProject } from './project.service';

@Route('api')
@Tags('Project')
export class ProjectController extends Controller {
  @Post(ROUTES.project.createProject)
  @Security('token')
  createProject(
    @Request() reqUser: UserInfo,
    @Body() body: CreateProjectReqDto,
  ) {
    return createProject(reqUser, body);
  }
}
