import { OrganizationsState } from './types';

interface Store {
  organizations?: OrganizationsState;
}

// Organizations List
export const getOrganizationsData = (store: Store) => store.organizations?.list?.data || undefined;

export const getOrganizationsError = (store: Store) =>
  store.organizations?.list?.error || undefined;

export const getOrganizationsLoading = (store: Store) =>
  store.organizations?.list?.isLoading || false;

// Organization Details
export const getOrganizationData = (store: Store) =>
  store.organizations?.details?.data || undefined;

export const getOrganizationError = (store: Store) =>
  store.organizations?.details?.error || undefined;

export const getOrganizationLoading = (store: Store) =>
  store.organizations?.details?.isLoading || false;

// Create Organization
export const createOrganizationStatus = (store: Store) =>
  store.organizations?.create?.status || undefined;

export const createOrganizationError = (store: Store) =>
  store.organizations?.create?.error || undefined;

export const createOrganizationLoading = (store: Store) =>
  store.organizations?.create?.isLoading || false;

// Update Organization
export const updateOrganizationStatus = (store: Store) =>
  store.organizations?.update?.status || undefined;

export const updateOrganizationError = (store: Store) =>
  store.organizations?.update?.error || undefined;

export const updateOrganizationLoading = (store: Store) =>
  store.organizations?.update?.isLoading || false;

// Remove Organization
export const removeOrganizationStatus = (store: Store) =>
  store.organizations?.remove?.status || undefined;

export const removeOrganizationError = (store: Store) =>
  store.organizations?.remove?.error || undefined;

export const removeOrganizationLoading = (store: Store) =>
  store.organizations?.remove?.isLoading || false;

// Organization Users List
export const getOrganizationUsersData = (store: Store) =>
  store.organizations?.users?.data || undefined;

export const getOrganizationUsersError = (store: Store) =>
  store.organizations?.users?.error || undefined;

export const getOrganizationUsersLoading = (store: Store) =>
  store.organizations?.users?.isLoading || false;

// Organization User Details
export const getOrganizationUserData = (store: Store) =>
  store.organizations?.userDetails?.data || undefined;

export const getOrganizationUserError = (store: Store) =>
  store.organizations?.userDetails?.error || undefined;

export const getOrganizationUserLoading = (store: Store) =>
  store.organizations?.userDetails?.isLoading || false;

// Create Organization User
export const createOrganizationUserStatus = (store: Store) =>
  store.organizations?.createUser?.status || undefined;

export const createOrganizationUserError = (store: Store) =>
  store.organizations?.createUser?.error || undefined;

export const createOrganizationUserLoading = (store: Store) =>
  store.organizations?.createUser?.isLoading || false;

// Update Organization User
export const updateOrganizationUserStatus = (store: Store) =>
  store.organizations?.updateUser?.status || undefined;

export const updateOrganizationUserError = (store: Store) =>
  store.organizations?.updateUser?.error || undefined;

export const updateOrganizationUserLoading = (store: Store) =>
  store.organizations?.updateUser?.isLoading || false;

// Remove Organization User
export const removeOrganizationUserStatus = (store: Store) =>
  store.organizations?.removeUser?.status || undefined;

export const removeOrganizationUserError = (store: Store) =>
  store.organizations?.removeUser?.error || undefined;

export const removeOrganizationUserLoading = (store: Store) =>
  store.organizations?.removeUser?.isLoading || false;

// Invite Organization User
export const inviteOrganizationUserStatus = (store: Store) =>
  store.organizations?.inviteUser?.status || undefined;

export const inviteOrganizationUserError = (store: Store) =>
  store.organizations?.inviteUser?.error || undefined;

export const inviteOrganizationUserLoading = (store: Store) =>
  store.organizations?.inviteUser?.isLoading || false;

// Organization Airlines List
export const getOrganizationAirlinesData = (store: Store) =>
  store.organizations?.airlines?.data || undefined;

export const getOrganizationAirlinesError = (store: Store) =>
  store.organizations?.airlines?.error || undefined;

export const getOrganizationAirlinesLoading = (store: Store) =>
  store.organizations?.airlines?.isLoading || false;

// Organization Airline Account
export const getAirlineAccountData = (store: Store) =>
  store.organizations?.account?.data || undefined;

export const getAirlineAccountError = (store: Store) =>
  store.organizations?.account?.error || undefined;

export const getAirlineAccountLoading = (store: Store) =>
  store.organizations?.account?.isLoading || false;

// Update Organization Airline Account
export const updateAirlineAccountStatus = (store: Store) =>
  store.organizations?.updateAccount?.status || undefined;

export const updateAirlineAccountError = (store: Store) =>
  store.organizations?.updateAccount?.error || undefined;

export const updateAirlineAccountLoading = (store: Store) =>
  store.organizations?.updateAccount?.isLoading || false;

// Create Multiple Organization Airline Account Air Waybills
export const createAirlineAccountAWBsData = (store: Store) =>
  store.organizations?.createAwbs?.data || undefined;

export const createAirlineAccountAWBsError = (store: Store) =>
  store.organizations?.createAwbs?.error || undefined;

export const createAirlineAccountAWBsLoading = (store: Store) =>
  store.organizations?.createAwbs?.isLoading || false;

// Organization Airline Account Air Waybills
export const getAirlineAccountAWBsData = (store: Store) =>
  store.organizations?.awbs?.data || undefined;

export const getAirlineAccountAWBsError = (store: Store) =>
  store.organizations?.awbs?.error || undefined;

export const getAirlineAccountAWBsLoading = (store: Store) =>
  store.organizations?.awbs?.isLoading || false;

// Create Organization Airline Account Air Waybill
export const createAirlineAccountAWBStatus = (store: Store) =>
  store.organizations?.createAwb?.status || undefined;

export const createAirlineAccountAWBError = (store: Store) =>
  store.organizations?.createAwb?.error || undefined;

export const createAirlineAccountAWBLoading = (store: Store) =>
  store.organizations?.createAwb?.isLoading || false;

// Remove Organization Airline Account Air Waybill
export const removeAirlineAccountAWBStatus = (store: Store) =>
  store.organizations?.removeAwb?.status || undefined;

export const removeAirlineAccountAWBError = (store: Store) =>
  store.organizations?.removeAwb?.error || undefined;

export const removeAirlineAccountAWBLoading = (store: Store) =>
  store.organizations?.removeAwb?.isLoading || false;
