import { UseFormRegister, UseFormReset } from 'react-hook-form';
import DialogActions from '@mui/material/DialogActions';
import { Button } from '@components/ui/Button';
import { useTheme } from '@hooks/useTheme';
import Dialog from '@mui/material/Dialog';
import { SetStateAction } from 'react';
import { Avatar } from '@mui/material';
import { TextArea } from './TextArea';

interface TextDialogProps {
  openDialog: boolean;
  setOpenDialog: (open: SetStateAction<boolean>) => void;
  onConfirm: () => void;
  isLoading: boolean;
  userAvatar: string;
  userName: string;
  error: string;
  register: UseFormRegister<{ content: string }>;
  reset: UseFormReset<{ content: string }>;
  jobName?: string;
  fieldName: string;
}

export const TextDialog = ({
  openDialog,
  setOpenDialog,
  onConfirm,
  isLoading,
  userAvatar,
  userName,
  error,
  register,
  jobName,
  fieldName,
  reset,
}: TextDialogProps) => {
  const { theme } = useTheme();

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '2px',
          padding: '32px',
          width: '100%',
          backgroundColor: theme === 'light' ? '#ffffff' : '#151515',
        },
      }}
    >
      <div className="flex items-center justify-start gap-4 mb-2">
        <Avatar
          alt="User avatar"
          src={userAvatar ? `${userAvatar}` : ''}
          sx={{
            border: '1px solid #fff',
            width: 64,
            height: 64,
          }}
        />
        <div>
          <h2 className="font-semibold text-sm dark:text-white">
            {userName}
            <span className="text-sm font-normal text-gray-600 text-[16px] dark:text-gray-300">
              , {jobName}.
            </span>
          </h2>
        </div>
      </div>
      <div>
        <TextArea
          error={error}
          placeholder="What do you think?"
          className="border-none"
          {...register(fieldName as 'content')}
        />
      </div>
      <DialogActions
        sx={{
          marginTop: '32px',
          padding: '0',
        }}
      >
        <Button
          onClick={
            // prettier-ignore
            !isLoading
              ? () => {
                handleClose();
                reset();
              }
              : undefined
          }
          className="text-sm h-[42px] text-primary border border-gray-300 bg-white dark:bg-black-700 dark:text-white active:bg-transparent dark:border-black-400"
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          type="submit"
          className="h-[42px] bg-transparent text-sm text-white bg-black-70 bg-primary dark:text-primary dark:bg-white dark:border-black-400"
          spinnerStyle="text-primary fill-white dark:text-white dark:fill-primary"
          onClick={() => {
            onConfirm();
          }}
        >
          Comment
        </Button>
      </DialogActions>
    </Dialog>
  );
};
