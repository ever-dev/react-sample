import * as React from 'react';

import { LoginPage } from './pages/Auth/LoginPage/Loadable';
import { RequestResetPage } from './pages/Auth/RequestResetPage/Loadable';
import { ResetPage } from './pages/Auth/ResetPage/Loadable';
import { SettingsPage } from './pages/Settings/Loadable';
import { OrganizationsPage } from './pages/Organizations/Loadable';
import { OrganizationSettingsPage } from './pages/OrganizationSettings/Loadable';
import { OrganizationAirlineAccountPage } from './pages/OrganizationAirlineAccount/Loadable';
import { UserSettingsPage } from './pages/UserSettings/Loadable';

interface Route {
  path: string;
  exact: boolean;
  children: () => JSX.Element;
}

export const authRoutes: Route[] = [
  {
    path: '/login',
    exact: true,
    children: () => <LoginPage />,
  },
  {
    path: '/request-reset',
    exact: true,
    children: () => <RequestResetPage />,
  },
  {
    path: '/reset-password/:token',
    exact: true,
    children: () => <ResetPage />,
  },
];

export const breadcrumbNameMap: { [key: string]: string } = {
  '/organizations': 'organizations',
  '/organizations/:id/users': 'organization_users',
  '/organizations/:id/airlines': 'organization_airlines',
};

export const appRoutes: Route[] = [
  {
    path: '/settings',
    exact: false,
    children: () => <SettingsPage />,
  },
  {
    path: '/organizations',
    exact: true,
    children: () => <OrganizationsPage />,
  },
  {
    path: '/organizations/:id/airlines/:airlinePrefix/:accountId',
    exact: true,
    children: () => <OrganizationAirlineAccountPage />,
  },
  {
    path: '/organizations/:id/users/:userId',
    exact: true,
    children: () => <UserSettingsPage />,
  },
  {
    path: '/organizations/:id',
    exact: false,
    children: () => <OrganizationSettingsPage />,
  },
];
