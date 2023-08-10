import DialogActions from '@mui/material/DialogActions';
import { Button } from '../../components/ui/Button';
import { env } from '../../../app/config/env';
import Dialog from '@mui/material/Dialog';
import { Avatar } from '@mui/material';
import { TextArea } from './TextArea';
import { UseFormRegister, UseFormReset } from 'react-hook-form';

interface TextDialogProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
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
          paddingY: '32px',
          paddingX: '48px',
          width: '100%',
        },
      }}
    >
      <div className="flex items-center justify-start gap-4 mb-2">
        <Avatar
          alt="User avatar"
          src={userAvatar ? `${env.apiUrl}/uploads/users/${userAvatar}` : ''}
          sx={{
            border: '1px solid #fff',
            width: 64,
            height: 64,
          }}
        />
        <div>
          <h2 className="font-semibold text-sm">
            {userName}
            <span className="text-sm font-normal text-gray-600 text-[16px]">
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
          className="text-sm h-[42px]"
        >
          Close
        </Button>
        <Button
          isloading={isLoading}
          type="submit"
          className="h-[42px] bg-transparent text-sm text-primary border border-gray-300 active:bg-transparent"
          SpinnerStyle="text-white fill-primary"
          onClick={() => {
            onConfirm();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
