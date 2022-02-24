import { ApiError, StatusState } from 'store/types';

export type OrganizationProfiles = 'admin' | 'cartage' | 'demo' | 'shipper' | 'ratepartner';

// List Queries
export interface OrganizationsQuery {
  page_number: number;
  page_size: number;
  status: string;
  search_text?: string;
  search_fields?: string;
  sort_field?: string;
}

export interface AirlineAccountAWBsQuery extends OrganizationsQuery {
  organization: string;
  prefix: string;
}

export interface OrganizationUsersQuery extends OrganizationsQuery {
  organization: number;
}

/* --------------
  Organization
-------------- */

export interface ProtoOrganization {
  address: string;
  address2?: string;
  city: string;
  country: string;
  email: string;
  contact_name: string;
  name: string;
  phone: string;
  state: string;
  zip_code: string;
}

export interface Organization extends ProtoOrganization {
  id: number;
  platform: string;
  profiles: OrganizationProfiles[];
  rate_logo: string;
  status: string;
  username: string;
}

// Organizations list
export interface OrganizationsData {
  items: Organization[];
  total_count: number;
}

export interface OrganizationsListState {
  data?: OrganizationsData;
  error?: ApiError;
  isLoading: boolean;
}

// Organization details
export interface OrganizationDetailsState {
  data?: Organization;
  error?: ApiError;
  isLoading: boolean;
}

/* --------------
  User
-------------- */

export interface ProtoOrganizationUser {
  organization: number;
  username: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrganizationUser extends ProtoOrganizationUser {
  id: number;
  contact: number;
  contact_email: string[];
  status: 'active' | 'invite' | 'lockout';
  role: string;
}

// Users list
export interface OrganizationUsersData {
  items: OrganizationUser[];
  total_count: number;
}

export interface OrganizationUsersListState {
  data?: OrganizationUsersData;
  error?: ApiError;
  isLoading: boolean;
}

export interface OrganizationUserState {
  data?: OrganizationUser;
  error?: ApiError;
  isLoading: boolean;
}

/* -----------------
  Airline accounts
----------------- */

export interface AirlineAccount {
  id: number;
  organization: number;
  airline: string;
  airline_name: string;
  account_number: string;
  air_waybill_number_airline_prefix: string;
  shipment_weight_limit: number;
  available_awb_number_count: number;
}

// Airline accounts list
export interface AirlinesData {
  items: AirlineAccount[];
  total_count: number;
}

export interface OrganizationAirlinesListState {
  data?: AirlinesData;
  error?: ApiError;
  isLoading: boolean;
}

// Airline account details
export interface AirlineAccountState {
  data?: AirlineAccount;
  error?: ApiError;
  isLoading: boolean;
}

/* -----------------
  Air Waybills
----------------- */

export interface ProtoAirlineAccountAWB {
  organization: string;
  prefix: string;
  serial_number: string;
}

export interface AirlineAccountAWB extends ProtoAirlineAccountAWB {
  id: number;
  status: string;
}

// Create air waybills
export interface CreateAirlineAccountAWBsState {
  data?: {
    inserted_record_count: number;
    error_record_count: number;
    error_records: number[];
  };
  error?: ApiError;
  isLoading: boolean;
}

// Air Waybill list
export interface AirlineAccountAWBsData {
  items: AirlineAccountAWB[];
  total_count: number;
}

export interface AirlineAccountAWBsState {
  data?: AirlineAccountAWBsData;
  error?: ApiError;
  isLoading: boolean;
}

/* -----------------
  Combined State
----------------- */
export interface OrganizationsState {
  list?: OrganizationsListState;
  details?: OrganizationDetailsState;
  create?: StatusState;
  update?: StatusState;
  remove?: StatusState;
  users?: OrganizationUsersListState;
  userDetails?: OrganizationUserState;
  createUser?: StatusState;
  updateUser?: StatusState;
  removeUser?: StatusState;
  inviteUser?: StatusState;
  airlines?: OrganizationAirlinesListState;
  account?: AirlineAccountState;
  updateAccount?: StatusState;
  createAwbs?: CreateAirlineAccountAWBsState;
  awbs?: AirlineAccountAWBsState;
  createAwb?: StatusState;
  removeAwb?: StatusState;
}
