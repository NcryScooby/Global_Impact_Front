import { httpClient } from '../httpClient';

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  token: string;
}

export const signUp = async (params: SignUpParams) => {
  const { data } = await httpClient.post<SignUpResponse>(
    '/auth/signup',
    params
  );

  return data;
};
