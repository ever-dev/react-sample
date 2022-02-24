import { ApiError, StatusState } from 'store/types';

interface UserPermission {
  id: number;
  permission_key: string;
  permission_value: boolean;
}

interface UserOrganization {
  id: number;
  name: string;
}

export interface User {
  acronym: string;
  address: string;
  auth_token_key?: string;
  city: string;
  contact: number;
  country: string;
  email: string;
  id: number;
  name: string;
  organization: UserOrganization;
  organization_owner_id: number;
  permissions: UserPermission[];
  phone: string;
  role: string;
  state: string;
  status: string;
  username: string;
  zip_code: string;
}

export interface LoginState {
  user?: User;
  error?: ApiError;
  isLoading: boolean;
}

export interface CheckBreachState {
  checkHash?: string;
  error?: ApiError;
  isLoading: boolean;
}

export interface AuthState {
  login?: LoginState;
  requestReset?: StatusState;
  checkBreach?: CheckBreachState;
  resetPassword?: StatusState;
}
