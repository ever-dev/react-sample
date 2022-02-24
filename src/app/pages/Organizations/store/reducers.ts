import {
  CLEAR_ORGANIZATIONS_CONTEXT,
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATIONS_SUCCEEDED,
  FETCH_ORGANIZATIONS_FAILED,
  CLEAR_ORGANIZATION_CONTEXT,
  FETCH_ORGANIZATION,
  FETCH_ORGANIZATION_SUCCEEDED,
  FETCH_ORGANIZATION_FAILED,
  CREATE_ORGANIZATION,
  CREATE_ORGANIZATION_SUCCEEDED,
  CREATE_ORGANIZATION_FAILED,
  UPDATE_ORGANIZATION,
  UPDATE_ORGANIZATION_SUCCEEDED,
  UPDATE_ORGANIZATION_FAILED,
  REMOVE_ORGANIZATION,
  REMOVE_ORGANIZATION_SUCCEEDED,
  REMOVE_ORGANIZATION_FAILED,
  CLEAR_ORGANIZATION_USERS_CONTEXT,
  CLEAR_ORGANIZATION_USER_CONTEXT,
  FETCH_ORGANIZATION_USERS,
  FETCH_ORGANIZATION_USERS_SUCCEEDED,
  FETCH_ORGANIZATION_USERS_FAILED,
  FETCH_ORGANIZATION_USER,
  FETCH_ORGANIZATION_USER_SUCCEEDED,
  FETCH_ORGANIZATION_USER_FAILED,
  CREATE_ORGANIZATION_USER,
  CREATE_ORGANIZATION_USER_SUCCEEDED,
  CREATE_ORGANIZATION_USER_FAILED,
  UPDATE_ORGANIZATION_USER,
  UPDATE_ORGANIZATION_USER_SUCCEEDED,
  UPDATE_ORGANIZATION_USER_FAILED,
  REMOVE_ORGANIZATION_USER,
  REMOVE_ORGANIZATION_USER_SUCCEEDED,
  REMOVE_ORGANIZATION_USER_FAILED,
  SEND_ORGANIZATION_USER_INVITE,
  SEND_ORGANIZATION_USER_INVITE_SUCCEEDED,
  SEND_ORGANIZATION_USER_INVITE_FAILED,
  FETCH_ORGANIZATION_AIRLINES,
  FETCH_ORGANIZATION_AIRLINES_SUCCEEDED,
  FETCH_ORGANIZATION_AIRLINES_FAILED,
  CLEAR_AIRLINE_CONTEXT,
  FETCH_AIRLINE_ACCOUNT,
  FETCH_AIRLINE_ACCOUNT_SUCCEEDED,
  FETCH_AIRLINE_ACCOUNT_FAILED,
  UPDATE_AIRLINE_ACCOUNT,
  UPDATE_AIRLINE_ACCOUNT_SUCCEEDED,
  UPDATE_AIRLINE_ACCOUNT_FAILED,
  CREATE_AIRLINE_ACCOUNT_AWBS,
  CREATE_AIRLINE_ACCOUNT_AWBS_SUCCEEDED,
  CREATE_AIRLINE_ACCOUNT_AWBS_FAILED,
  FETCH_AIRLINE_ACCOUNT_AWBS,
  FETCH_AIRLINE_ACCOUNT_AWBS_SUCCEEDED,
  FETCH_AIRLINE_ACCOUNT_AWBS_FAILED,
  CREATE_AIRLINE_ACCOUNT_AWB,
  CREATE_AIRLINE_ACCOUNT_AWB_SUCCEEDED,
  CREATE_AIRLINE_ACCOUNT_AWB_FAILED,
  REMOVE_AIRLINE_ACCOUNT_AWB,
  REMOVE_AIRLINE_ACCOUNT_AWB_SUCCEEDED,
  REMOVE_AIRLINE_ACCOUNT_AWB_FAILED,
} from './actionTypes';
import { CLEAR_ALERTS } from '../../../store/actionTypes';
import {
  OrganizationDetailsState,
  OrganizationsListState,
  OrganizationUsersListState,
  OrganizationUserState,
  OrganizationAirlinesListState,
  AirlineAccountState,
  AirlineAccountAWBsState,
  CreateAirlineAccountAWBsState,
} from './types';
import { combineReducers } from '@reduxjs/toolkit';
import { StatusState } from '../../../../store/types';

const initialState = {
  isLoading: false,
};

export function organizationsReducer(state: OrganizationsListState = initialState, action) {
  switch (action.type) {
    case CLEAR_ORGANIZATIONS_CONTEXT: {
      return {
        data: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_ORGANIZATIONS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_ORGANIZATIONS_SUCCEEDED: {
      return {
        data: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_ORGANIZATIONS_FAILED: {
      return {
        data: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function organizationDetailsReducer(state: OrganizationDetailsState = initialState, action) {
  switch (action.type) {
    case CLEAR_ORGANIZATION_CONTEXT: {
      return {
        data: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_ORGANIZATION: {
      return {
        data: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case FETCH_ORGANIZATION_SUCCEEDED: {
      return {
        data: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case UPDATE_ORGANIZATION_SUCCEEDED: {
      return {
        data: action.payload.data,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_ORGANIZATION_FAILED: {
      return {
        data: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function createOrganizationReducer(state: StatusState = initialState, action) {
  switch (action.type) {
    case CLEAR_ORGANIZATIONS_CONTEXT:
    case REMOVE_ORGANIZATION_SUCCEEDED: {
      return {
        status: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case CLEAR_ALERTS: {
      return {
        ...state,
        status: undefined,
        error: undefined,
      };
    }
    case CREATE_ORGANIZATION: {
      return {
        status: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case CREATE_ORGANIZATION_SUCCEEDED: {
      return {
        status: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case CREATE_ORGANIZATION_FAILED: {
      return {
        status: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function updateOrganizationReducer(state: StatusState = initialState, action) {
  switch (action.type) {
    case CLEAR_ORGANIZATION_CONTEXT: {
      return {
        status: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case CLEAR_ALERTS: {
      return {
        ...state,
        status: undefined,
        error: undefined,
      };
    }
    case UPDATE_ORGANIZATION: {
      return {
        status: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case UPDATE_ORGANIZATION_SUCCEEDED: {
      return {
        status: action.payload.status,
        error: undefined,
        isLoading: false,
      };
    }
    case UPDATE_ORGANIZATION_FAILED: {
      return {
        status: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function removeOrganizationReducer(state: StatusState = initialState, action) {
  switch (action.type) {
    case CLEAR_ORGANIZATIONS_CONTEXT:
    case CREATE_ORGANIZATION_SUCCEEDED: {
      return {
        status: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case CLEAR_ALERTS: {
      return {
        ...state,
        status: undefined,
        error: undefined,
      };
    }
    case REMOVE_ORGANIZATION: {
      return {
        status: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case REMOVE_ORGANIZATION_SUCCEEDED: {
      return {
        status: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case REMOVE_ORGANIZATION_FAILED: {
      return {
        status: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function organizationUsersReducer(state: OrganizationUsersListState = initialState, action) {
  switch (action.type) {
    case CLEAR_ORGANIZATION_USERS_CONTEXT: {
      return {
        data: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_ORGANIZATION_USERS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_ORGANIZATION_USERS_SUCCEEDED: {
      return {
        data: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_ORGANIZATION_USERS_FAILED: {
      return {
        data: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function organizationUserReducer(state: OrganizationUserState = initialState, action) {
  switch (action.type) {
    case CLEAR_ORGANIZATION_USER_CONTEXT: {
      return {
        data: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_ORGANIZATION_USER: {
      return {
        data: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case UPDATE_ORGANIZATION_USER_SUCCEEDED: {
      return {
        data: action.payload.data,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_ORGANIZATION_USER_SUCCEEDED: {
      return {
        data: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_ORGANIZATION_USER_FAILED: {
      return {
        data: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function createOrganizationUserReducer(state: StatusState = initialState, action) {
  switch (action.type) {
    case CLEAR_ORGANIZATION_USERS_CONTEXT:
    case REMOVE_ORGANIZATION_USER_SUCCEEDED: {
      return {
        status: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case CLEAR_ALERTS: {
      return {
        ...state,
        status: undefined,
        error: undefined,
      };
    }
    case CREATE_ORGANIZATION_USER: {
      return {
        status: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case CREATE_ORGANIZATION_USER_SUCCEEDED: {
      return {
        status: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case CREATE_ORGANIZATION_USER_FAILED: {
      return {
        status: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function updateOrganizationUserReducer(state: StatusState = initialState, action) {
  switch (action.type) {
    case CLEAR_ORGANIZATION_USER_CONTEXT: {
      return {
        status: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case CLEAR_ALERTS: {
      return {
        ...state,
        status: undefined,
        error: undefined,
      };
    }
    case UPDATE_ORGANIZATION_USER: {
      return {
        status: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case UPDATE_ORGANIZATION_USER_SUCCEEDED: {
      return {
        status: action.payload.status,
        error: undefined,
        isLoading: false,
      };
    }
    case UPDATE_ORGANIZATION_USER_FAILED: {
      return {
        status: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function removeOrganizationUserReducer(state: StatusState = initialState, action) {
  switch (action.type) {
    case CLEAR_ORGANIZATION_USERS_CONTEXT:
    case CREATE_ORGANIZATION_USER_SUCCEEDED: {
      return {
        status: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case CLEAR_ALERTS: {
      return {
        ...state,
        status: undefined,
        error: undefined,
      };
    }
    case REMOVE_ORGANIZATION_USER: {
      return {
        status: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case REMOVE_ORGANIZATION_USER_SUCCEEDED: {
      return {
        status: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case REMOVE_ORGANIZATION_USER_FAILED: {
      return {
        status: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function inviteOrganizationUserReducer(state: StatusState = initialState, action) {
  switch (action.type) {
    case CLEAR_ORGANIZATION_USER_CONTEXT: {
      return {
        status: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case CLEAR_ALERTS: {
      return {
        ...state,
        status: undefined,
        error: undefined,
      };
    }
    case SEND_ORGANIZATION_USER_INVITE: {
      return {
        status: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case SEND_ORGANIZATION_USER_INVITE_SUCCEEDED: {
      return {
        status: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case SEND_ORGANIZATION_USER_INVITE_FAILED: {
      return {
        status: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function organizationAirlinesReducer(
  state: OrganizationAirlinesListState = initialState,
  action,
) {
  switch (action.type) {
    case CLEAR_ORGANIZATION_CONTEXT: {
      return {
        data: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_ORGANIZATION_AIRLINES: {
      return {
        data: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case FETCH_ORGANIZATION_AIRLINES_SUCCEEDED: {
      return {
        data: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_ORGANIZATION_AIRLINES_FAILED: {
      return {
        data: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function airlineAccountReducer(state: AirlineAccountState = initialState, action) {
  switch (action.type) {
    case CLEAR_AIRLINE_CONTEXT: {
      return {
        data: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_AIRLINE_ACCOUNT: {
      return {
        data: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case FETCH_AIRLINE_ACCOUNT_SUCCEEDED: {
      return {
        data: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case UPDATE_AIRLINE_ACCOUNT_SUCCEEDED: {
      return {
        data: action.payload.data,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_AIRLINE_ACCOUNT_FAILED: {
      return {
        data: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function updateAirlineAccountReducer(state: StatusState = initialState, action) {
  switch (action.type) {
    case CLEAR_AIRLINE_CONTEXT: {
      return {
        status: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case CLEAR_ALERTS: {
      return {
        ...state,
        status: undefined,
        error: undefined,
      };
    }
    case UPDATE_AIRLINE_ACCOUNT: {
      return {
        status: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case UPDATE_AIRLINE_ACCOUNT_SUCCEEDED: {
      return {
        status: action.payload.status,
        error: undefined,
        isLoading: false,
      };
    }
    case UPDATE_AIRLINE_ACCOUNT_FAILED: {
      return {
        status: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function createAirlineAccountAWBsReducer(
  state: CreateAirlineAccountAWBsState = initialState,
  action,
) {
  switch (action.type) {
    case CLEAR_AIRLINE_CONTEXT: {
      return {
        data: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case CREATE_AIRLINE_ACCOUNT_AWBS: {
      return {
        data: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case CREATE_AIRLINE_ACCOUNT_AWBS_SUCCEEDED: {
      return {
        data: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case CREATE_AIRLINE_ACCOUNT_AWBS_FAILED: {
      return {
        data: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function airlineAccountAWBsReducer(state: AirlineAccountAWBsState = initialState, action) {
  switch (action.type) {
    case CLEAR_AIRLINE_CONTEXT: {
      return {
        data: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_AIRLINE_ACCOUNT_AWBS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_AIRLINE_ACCOUNT_AWBS_SUCCEEDED: {
      return {
        data: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_AIRLINE_ACCOUNT_AWBS_FAILED: {
      return {
        data: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function createAirlineAccountAWBReducer(state: StatusState = initialState, action) {
  switch (action.type) {
    case CLEAR_AIRLINE_CONTEXT:
    case REMOVE_AIRLINE_ACCOUNT_AWB_SUCCEEDED: {
      return {
        status: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case CLEAR_ALERTS: {
      return {
        ...state,
        status: undefined,
        error: undefined,
      };
    }
    case CREATE_AIRLINE_ACCOUNT_AWB: {
      return {
        status: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case CREATE_AIRLINE_ACCOUNT_AWB_SUCCEEDED: {
      return {
        status: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case CREATE_AIRLINE_ACCOUNT_AWB_FAILED: {
      return {
        status: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function removeAirlineAccountAWBReducer(state: StatusState = initialState, action) {
  switch (action.type) {
    case CLEAR_AIRLINE_CONTEXT:
    case CREATE_AIRLINE_ACCOUNT_AWB_SUCCEEDED: {
      return {
        status: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case CLEAR_ALERTS: {
      return {
        ...state,
        status: undefined,
        error: undefined,
      };
    }
    case REMOVE_AIRLINE_ACCOUNT_AWB: {
      return {
        status: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case REMOVE_AIRLINE_ACCOUNT_AWB_SUCCEEDED: {
      return {
        status: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case REMOVE_AIRLINE_ACCOUNT_AWB_FAILED: {
      return {
        status: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  list: organizationsReducer,
  details: organizationDetailsReducer,
  create: createOrganizationReducer,
  update: updateOrganizationReducer,
  remove: removeOrganizationReducer,
  users: organizationUsersReducer,
  userDetails: organizationUserReducer,
  createUser: createOrganizationUserReducer,
  updateUser: updateOrganizationUserReducer,
  removeUser: removeOrganizationUserReducer,
  inviteUser: inviteOrganizationUserReducer,
  airlines: organizationAirlinesReducer,
  account: airlineAccountReducer,
  updateAccount: updateAirlineAccountReducer,
  createAwbs: createAirlineAccountAWBsReducer,
  awbs: airlineAccountAWBsReducer,
  createAwb: createAirlineAccountAWBReducer,
  removeAwb: removeAirlineAccountAWBReducer,
});
