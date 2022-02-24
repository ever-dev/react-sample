import { ApiError } from 'store/types';

interface CountryField {
  field: string;
  display: string;
  values?: object;
}

export interface ProtoCountry {
  name: string;
  value: string;
}

export interface Country extends ProtoCountry {
  fields: CountryField[];
}

export interface CountriesState {
  data?: ProtoCountry[];
  dictionary?: Record<string, { name: string; fields: CountryField[] }>;
  error?: ApiError;
  isLoading: boolean;
}
