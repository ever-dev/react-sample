export interface ApiError {
  status: number;
  data: string | object;
}

export interface StatusState {
  status?: number;
  error?: ApiError;
  isLoading: boolean;
}
