import CodeHome from '@pages/web/code/CodeHome';
import Home from '@pages/web/home/Home';
import { RoutingTypes } from '@type/web/routerTypes';

export const routerList: RoutingTypes = {
  HOME: {
    path: '/',
    component: Home,
  },
  CODEHOME: {
    path: '/code/*',
    component: CodeHome,
  },
  BLOGHOME: {
    path: '/blog/*',
  },
};
