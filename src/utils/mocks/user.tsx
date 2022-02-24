import { User } from '../../app/pages/Auth/store/types';

export const mockUser: User = {
  acronym: 'MU',
  address: '123 Address Ln',
  auth_token_key: 'fake_token',
  city: 'City',
  contact: 0,
  country: 'Country',
  email: 'fake.address@email.com',
  id: 0,
  name: 'Mock User',
  organization: {
    id: 0,
    name: 'Corpo',
  },
  organization_owner_id: 0,
  permissions: [],
  phone: '+1 (123) 123-1234',
  role: 'user',
  state: 'IL',
  status: 'active',
  username: 'fake_user',
  zip_code: '60601',
};
