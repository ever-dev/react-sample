import { StatusState } from '../../../../store/types';

export interface UserSettings {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  username: string;
  zip_code: string;
}

export interface UserPassword {
  confirm: string;
  current: string;
  new: string;
  username: string;
}

export interface SettingsState {
  userSettings?: StatusState;
  userPassword?: StatusState;
}
