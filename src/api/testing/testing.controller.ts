import { Controller, Get, Route, Tags } from 'tsoa';
import { ROUTES } from '../../utils/constants';
import { getHealthCheck } from './testing.service';

@Route('api')
@Tags('Testing')
export class TestingController extends Controller {
  @Get(ROUTES.testing.healthCheck)
  public async getHealthCheck() {
    return await getHealthCheck();
  }
}
