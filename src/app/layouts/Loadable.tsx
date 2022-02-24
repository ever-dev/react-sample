import { lazyLoad } from 'utils/loadable';

/**
 * Asynchronously loads the component for authLayout
 */

export const AuthLayout = lazyLoad(
  () => import('./authLayout'),
  module => module.AuthLayout,
);

/**
 * Asynchronously loads the component for mainLayout
 */

export const MainLayout = lazyLoad(
  () => import('./mainLayout'),
  module => module.MainLayout,
);
