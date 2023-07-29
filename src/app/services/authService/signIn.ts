import { httpClient } from '../httpClient';

export interface SignInParams {
  email: string;
  password: string;
}

interface SignInResponse {
  token: string;
}

export const signIn = async (params: SignInParams) => {
  const { data } = await httpClient.post<SignInResponse>(
    '/auth/signin',
    params
  );

  return data;
};
