import { httpClient } from '../httpClient';

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  avatar: FileList;
}

interface SignUpResponse {
  token: string;
}

export const signUp = async (body: SignUpData): Promise<SignUpResponse> => {
  const { data } = await httpClient.post<SignUpResponse>('/auth/signup', body);

  return data;
};
