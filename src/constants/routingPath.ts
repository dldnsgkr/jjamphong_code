import BlogHome from '@pages/web/blog/BlogHome';
import Home from '@pages/web/Home/Home';
import { RoutingTypes } from '@type/web/routerTypes';

export const routerList: RoutingTypes = {
  HOME: {
    path: '/',
    component: Home,
  },
  BLOG: {
    path: '/blog',
    component: BlogHome,
  },
};
