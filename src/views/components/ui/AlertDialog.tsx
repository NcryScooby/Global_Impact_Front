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
}

export const AlertDialog = ({
  openDialog,
  setOpenDialog,
  onConfirm,
  isLoading,
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
          Are you sure you want to delete this comment?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontSize: '14px',
            }}
          >
            Do you really want to remove this comment? Once deleted, it cannot
            be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={isLoading ? undefined : handleClose}
            className="text-sm h-[42px]"
          >
            Close
          </Button>
          <Button
            isloading={isLoading}
            onClick={() => {
              onConfirm();
            }}
            className="h-[42px] bg-transparent text-sm text-primary border border-gray-300 active:bg-transparent fill-gray-300"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
