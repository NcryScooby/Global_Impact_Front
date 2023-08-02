import { httpClient } from '../httpClient';

interface Me {
  user: {
    name: string;
    email: string;
  };
}

export const me = async () => {
  const { data } = await httpClient.get<Me>('/users/me');

  return data;
};
