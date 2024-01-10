import {
  Route,
  Tags,
  Controller,
  Get,
  Security,
  Path,
  Request,
  Body,
  Post,
  Patch,
} from 'tsoa';
import { ROUTES } from '../../utils/constants';
import { UserInfo } from '../../utils/interfaces/auth.interface';
import { getProjectBugs, createBug, assignBugToMe } from './bug.service';
import { CreateBugReqDto } from './dtos/create-bug.dto';

@Route('api')
@Tags('Bugs')
export class BugController extends Controller {
  @Get(ROUTES.bug.getProjectBugs)
  @Security('token')
  getProjectBugs(@Request() reqUser: UserInfo, @Path() projectId: string) {
    return getProjectBugs(reqUser, projectId);
  }

  @Post(ROUTES.bug.createBug)
  @Security('token')
  createBug(
    @Request() reqUser: UserInfo,
    @Path() projectId: string,
    @Body() createBugReqDto: CreateBugReqDto,
  ) {
    return createBug(reqUser, projectId, createBugReqDto);
  }

  @Patch(ROUTES.bug.assignBugToMe)
  @Security('token')
  assignBugToMe(@Request() reqUser: UserInfo, @Path() bugId: string) {
    return assignBugToMe(reqUser, bugId);
  }
}
