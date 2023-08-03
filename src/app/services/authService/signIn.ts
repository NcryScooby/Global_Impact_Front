import { httpClient } from '../httpClient';

export interface SignInData {
  email: string;
  password: string;
}

interface SignInResponse {
  token: string;
}

export const signIn = async (body: SignInData): Promise<SignInResponse> => {
  const { data } = await httpClient.post<SignInResponse>('/auth/signin', body);

  return data;
};
