import { UseFormRegister, UseFormReset } from 'react-hook-form';
import { BaseSyntheticEvent } from 'react';
import { TextDialog } from './TextDialog';

type CreateCommentFunction = (e?: BaseSyntheticEvent<object>) => Promise<void>;

interface TextAlertDialogProps {
  open: boolean;
  userAvatar: string;
  userName: string;
  jobName: string;
  isLoading: boolean;
  openDialog: boolean;
  onConfirm: CreateCommentFunction;
  setOpenDialog: (open: boolean) => void;
  fieldName: string;
  error: string;
  register: UseFormRegister<{ content: string }>;
  reset: UseFormReset<{ content: string }>;
}

export const TextAlertDialog = ({
  open,
  onConfirm,
  setOpenDialog,
  userAvatar,
  userName,
  jobName,
  isLoading,
  error,
  fieldName,
  register,
  reset,
}: TextAlertDialogProps) => {
  return open ? (
    <TextDialog
      userAvatar={userAvatar}
      userName={userName || ''}
      jobName={jobName || ''}
      isLoading={isLoading}
      onConfirm={onConfirm}
      openDialog={open}
      setOpenDialog={setOpenDialog}
      error={error}
      fieldName={fieldName}
      register={register}
      reset={reset}
    />
  ) : null;
};
