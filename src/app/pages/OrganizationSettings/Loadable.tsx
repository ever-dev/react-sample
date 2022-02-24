/**
 * Asynchronously loads the component for OrganizationSettingsPage
 */

import { lazyLoad } from 'utils/loadable';

export const OrganizationSettingsPage = lazyLoad(
  () => import('./index'),
  module => module.OrganizationSettingsPage,
);
