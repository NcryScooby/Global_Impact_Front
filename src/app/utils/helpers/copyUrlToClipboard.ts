import { toast } from 'react-hot-toast';

export const copyUrlToClipboard = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.success('URL copied to clipboard');
  } catch (error) {
    toast.error('Failed to copy URL to clipboard');
    console.error(error);
  }
};
