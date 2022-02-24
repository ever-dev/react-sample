import { combineReducers } from '@reduxjs/toolkit';
import {
  CLEAR_SETTINGS_CONTEXT,
  UPDATE_SETTINGS,
  UPDATE_SETTINGS_SUCCEEDED,
  UPDATE_SETTINGS_FAILED,
  CLEAR_USER_PASSWORD_CONTEXT,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PASSWORD_SUCCEEDED,
  UPDATE_USER_PASSWORD_FAILED,
} from './actionTypes';
import { CLEAR_ALERTS } from 'app/store/actionTypes';
import { StatusState } from 'store/types';

const initialState = {
  isLoading: false,
};

export function userSettingsReducer(state: StatusState = initialState, action) {
  switch (action.type) {
    case CLEAR_SETTINGS_CONTEXT:
    case CLEAR_ALERTS: {
      return {
        status: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case UPDATE_SETTINGS: {
      return {
        status: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case UPDATE_SETTINGS_SUCCEEDED: {
      return {
        status: action.payload.status,
        error: undefined,
        isLoading: false,
      };
    }
    case UPDATE_SETTINGS_FAILED: {
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

export function userPasswordReducer(state: StatusState = initialState, action) {
  switch (action.type) {
    case CLEAR_USER_PASSWORD_CONTEXT:
    case CLEAR_ALERTS: {
      return {
        status: undefined,
        error: undefined,
        isLoading: false,
      };
    }
    case UPDATE_USER_PASSWORD: {
      return {
        status: undefined,
        error: undefined,
        isLoading: true,
      };
    }
    case UPDATE_USER_PASSWORD_SUCCEEDED: {
      return {
        status: action.payload,
        error: undefined,
        isLoading: false,
      };
    }
    case UPDATE_USER_PASSWORD_FAILED: {
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
  userSettings: userSettingsReducer,
  userPassword: userPasswordReducer,
});
