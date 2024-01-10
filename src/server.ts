import AuthRouter from './api/auth/auth.router';
import BugRouter from './api/bug/bug.router';
import ProjectRouter from './api/project/project.router';
import TestingRouter from './api/testing/testing.router';
import UserRouter from './api/user/user.router';
import { App } from './app';

const routes = [
  new TestingRouter(),
  new AuthRouter(),
  new ProjectRouter(),
  new UserRouter(),
  new BugRouter(),
];

const app = new App(routes);

app.listen();

process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', error);
});

process.on('uncaughtException', (error) => {
  console.error('uncaughtException', error);
});
