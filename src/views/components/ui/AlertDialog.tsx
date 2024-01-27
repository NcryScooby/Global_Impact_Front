import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@components/ui/Button';
import { useTheme } from '@hooks/useTheme';
import Dialog from '@mui/material/Dialog';
import { SetStateAction } from 'react';

interface AlertDialogProps {
  openDialog: boolean;
  setOpenDialog: (open: SetStateAction<boolean>) => void;
  onConfirm: () => void;
  isLoading: boolean;
  title: string;
  content: string;
}

export const AlertDialog = ({
  openDialog,
  setOpenDialog,
  onConfirm,
  isLoading,
  title,
  content,
}: AlertDialogProps) => {
  const handleClose = () => {
    setOpenDialog(false);
  };

  const { theme } = useTheme();

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '2px',
            padding: '16px',
            backgroundColor: theme === 'light' ? '#ffffff' : '#151515',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: '18px',
            color: theme === 'light' ? '#151515' : '#ffffff',
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontSize: '14px',
              color: theme === 'light' ? '#151515' : '#dbdbdb',
            }}
          >
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={isLoading ? undefined : handleClose}
            className="text-sm h-[42px] dark:bg-white dark:text-primary"
          >
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            onClick={onConfirm}
            className="h-[42px] bg-transparent text-sm text-primary border border-gray-300 active:bg-transparent dark:text-white dark:bg-black-700 dark:border-black-400"
            spinnerStyle="text-white fill-primary dark:text-primary dark:fill-white"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
