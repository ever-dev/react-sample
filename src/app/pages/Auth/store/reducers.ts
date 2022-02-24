import {
  CLEAR_AUTH_CONTEXT,
  LOG_IN,
  LOG_IN_SUCCEEDED,
  LOG_IN_FAILED,
  LOG_OUT,
  FETCH_SESSION,
  FETCH_SESSION_SUCCEEDED,
  FETCH_SESSION_FAILED,
  REQUEST_RESET,
  REQUEST_RESET_SUCCEEDED,
  REQUEST_RESET_FAILED,
  PASSWORD_BREACHED,
  PASSWORD_BREACHED_SUCCEEDED,
  PASSWORD_BREACHED_FAILED,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCEEDED,
  RESET_PASSWORD_FAILED,
} from './actionTypes';
import { StatusState } from 'store/types';
import { CLEAR_ALERTS } from 'app/store/actionTypes';
import { UPDATE_SETTINGS_SUCCEEDED } from '../../Settings/store/actionTypes';
import { CheckBreachState, LoginState } from './types';
import { combineReducers } from '@reduxjs/toolkit';
import { UserSettings } from '../../Settings/store/types';
import { removeAuthHeader } from 'utils/axiosUtils';
import { createAuthCookie, removeAuthCookie } from 'utils/cookies';

const initialState = {
  isLoading: false,
};

export function loginReducer(state: LoginState = initialState, action) {
  switch (action.type) {
    case CLEAR_AUTH_CONTEXT: {
      return {
        ...state,
        error: undefined,
        isLoading: false,
      };
    }
    case LOG_IN:
    case FETCH_SESSION: {
      return {
        user: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case UPDATE_SETTINGS_SUCCEEDED: {
      const userData: UserSettings = action.payload.data;
      return {
        ...state,
        user: { ...state.user, ...userData },
      };
    }
    case LOG_IN_SUCCEEDED: {
      const nameAr = action.payload.name.split(' ');
      const acronym = nameAr[0].match(/[A-Z]/) + nameAr[1].match(/[A-Z]/);
      const user = {
        ...action.payload,
        acronym,
      };
      createAuthCookie(user.auth_token_key);
      delete user.auth_token_key;
      return {
        user,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_SESSION_SUCCEEDED: {
      const nameAr = action.payload.name.split(' ');
      const acronym = nameAr[0].match(/[A-Z]/) + nameAr[1].match(/[A-Z]/);
      const user = {
        ...action.payload,
        acronym,
      };
      delete user.auth_token_key;
      return {
        user,
        error: undefined,
        isLoading: false,
      };
    }
    case LOG_IN_FAILED: {
      return {
        user: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    case LOG_OUT:
    case FETCH_SESSION_FAILED: {
      removeAuthCookie();
      removeAuthHeader();
      return {
        user: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function requestResetReducer(state: StatusState = initialState, action) {
  switch (action.type) {
    case CLEAR_AUTH_CONTEXT: {
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
    case REQUEST_RESET: {
      return {
        status: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case REQUEST_RESET_SUCCEEDED: {
      return {
        status: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case REQUEST_RESET_FAILED: {
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

export function checkBreachReducer(state: CheckBreachState = initialState, action) {
  switch (action.type) {
    case CLEAR_AUTH_CONTEXT: {
      return {
        checkHash: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case PASSWORD_BREACHED: {
      return {
        checkHash: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case PASSWORD_BREACHED_SUCCEEDED: {
      return {
        checkHash: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case PASSWORD_BREACHED_FAILED: {
      return {
        checkHash: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export function resetPasswordReducer(state: StatusState = initialState, action) {
  switch (action.type) {
    case LOG_IN:
    case REQUEST_RESET: {
      return {
        ...state,
        status: undefined,
      };
    }
    case CLEAR_AUTH_CONTEXT: {
      return {
        ...state,
        error: undefined,
        isLoading: false,
      };
    }
    case RESET_PASSWORD: {
      return {
        status: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case RESET_PASSWORD_SUCCEEDED: {
      return {
        status: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case RESET_PASSWORD_FAILED: {
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
  login: loginReducer,
  requestReset: requestResetReducer,
  checkBreach: checkBreachReducer,
  resetPassword: resetPasswordReducer,
});
