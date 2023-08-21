import { Button } from '../../components/ui/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
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

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '2px',
            padding: '16px',
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: '18px',
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontSize: '14px',
            }}
          >
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={isLoading ? undefined : handleClose} className="text-sm h-[42px]">
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            onClick={onConfirm}
            className="h-[42px] bg-transparent text-sm text-primary border border-gray-300 active:bg-transparent"
            spinnerStyle="text-white fill-primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
