import CodeMain from '@pages/web/code/CodeMain';
import CodePostEditorPage from '@pages/web/code/CodePostEditorPage';
import { RoutingTypes } from '@type/web/routerTypes';

export const routerList: RoutingTypes = {
  CODEHOME: {
    path: '/',
    component: CodeMain,
  },
  CODEPOSTEDITE: {
    path: '/postEdite',
    component: CodePostEditorPage,
  },
};
