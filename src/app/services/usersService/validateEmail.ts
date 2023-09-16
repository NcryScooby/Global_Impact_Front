import { httpClient } from '../httpClient';

export interface ValidateEmailData {
  email: string;
}

export interface ValidateEmailResponse {
  isEmailAvailable: boolean;
}

export const validateEmail = async (body: ValidateEmailData): Promise<ValidateEmailResponse> => {
  const { data } = await httpClient.post<ValidateEmailResponse>('/users/validate-email', body);

  return data;
};
