import { httpClient } from '../httpClient';

export interface ValidateUsernameData {
  username: string;
}

export interface ValidateUsernameResponse {
  isUsernameAvailable: boolean;
}

export const validateUsername = async (
  body: ValidateUsernameData
): Promise<ValidateUsernameResponse> => {
  const { data } = await httpClient.post<ValidateUsernameResponse>(
    '/users/validate-username',
    body
  );

  return data;
};
