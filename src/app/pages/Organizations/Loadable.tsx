/**
 * Asynchronously loads the component for OrganizationsPage
 */

import { lazyLoad } from 'utils/loadable';

export const OrganizationsPage = lazyLoad(
  () => import('./index'),
  module => module.OrganizationsPage,
);
