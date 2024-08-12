import { ComponentType } from 'react';

export type RoutingTypes = {
  [key: string]: {
    path: string;
    component?: ComponentType;
  };
};
