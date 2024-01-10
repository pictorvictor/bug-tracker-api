import {
  Body,
  Controller,
  Request,
  Post,
  Route,
  Security,
  Tags,
  Get,
  Path,
} from 'tsoa';
import { ROUTES } from '../../utils/constants';
import { CreateProjectReqDto } from './dtos/create-project.dto';
import { UserInfo } from '../../utils/interfaces/auth.interface';
import {
  createProject,
  getAllProjects,
  enrollInProject,
} from './project.service';

@Route('api')
@Tags('Project')
export class ProjectController extends Controller {
  @Post(ROUTES.project.projects)
  @Security('token')
  createProject(
    @Request() reqUser: UserInfo,
    @Body() body: CreateProjectReqDto,
  ) {
    return createProject(reqUser, body);
  }

  @Get(ROUTES.project.projects)
  @Security('token')
  getAllProjects(@Request() reqUser: UserInfo) {
    return getAllProjects(reqUser);
  }

  @Post(ROUTES.project.enrollInProject)
  @Security('token')
  enrollInProject(@Request() reqUser: UserInfo, @Path() projectId: string) {
    return enrollInProject(reqUser, projectId);
  }
}
