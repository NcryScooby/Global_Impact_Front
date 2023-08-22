import { AlertDialog } from './AlertDialog';
import { SetStateAction } from 'react';

interface DeleteAlertDialogProps {
  title: string;
  content: string;
  isLoading: boolean;
  open: boolean;
  onConfirm: (featureId: string) => Promise<void>;
  featureId: string;
  setOpenDialog: (open: SetStateAction<boolean>) => void;
}

export const DeleteAlertDialog = ({
  title,
  content,
  isLoading,
  open,
  onConfirm,
  featureId,
  setOpenDialog,
}: DeleteAlertDialogProps) => {
  return open ? (
    <AlertDialog
      title={title}
      content={content}
      isLoading={isLoading}
      openDialog={open}
      setOpenDialog={setOpenDialog}
      onConfirm={() => onConfirm(featureId)}
    />
  ) : null;
};
