import AuthRouter from './api/auth/auth.router';
import TestingRouter from './api/testing/testing.router';
import UserRouter from './api/user/user.router';
import { App } from './app';

const routes = [new TestingRouter(), new UserRouter(), new AuthRouter()];

const app = new App(routes);

app.listen();

process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', error);
});

process.on('uncaughtException', (error) => {
  console.error('uncaughtException', error);
});
