import { OrganizationUsersData, OrganizationUser } from 'app/pages/Organizations/store/types';

const mockOrganizationUsers: OrganizationUser[] = [
  {
    id: 1,
    email: 'hello@app.com',
    username: 'app_test',
    phone: '3122656585',
    role: 'user',
    organization: 1,
    contact: 1,
    contact_email: [],
    name: 'App',
    status: 'active',
  },
  {
    id: 2,
    email: 'user@app.com',
    username: 'app_user',
    phone: '3122656586',
    role: 'user',
    organization: 1,
    contact: 2,
    contact_email: [],
    name: 'App User',
    status: 'active',
  },
];

export const mockOrganizationUsersData: OrganizationUsersData = {
  items: mockOrganizationUsers,
  total_count: mockOrganizationUsers.length,
};
