import { KeyboardEvent } from 'react';

export const disableEnterKeySubmit = (event: KeyboardEvent<HTMLFormElement>) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
};
