import { copyUrlToClipboard } from '../../../app/utils/helpers/copyUrlToClipboard';
import { FaTwitter, FaFacebook } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { IoLogoWhatsapp } from 'react-icons/io';
import { SocialIcon } from './SocialIcon';
import Modal from '@mui/material/Modal';
import { Button } from './Button';
import { Input } from './Input';

interface ShareDialogProps {
  openShareDialog: boolean;
  handleCloseShareDialog: () => void;
}

export const ShareDialog = ({ openShareDialog, handleCloseShareDialog }: ShareDialogProps) => {
  const currentUrl = window.location.href;

  return (
    <>
      <Modal
        open={openShareDialog}
        onClose={handleCloseShareDialog}
        aria-labelledby="share-modal-title"
        aria-describedby="share-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[450px] bg-white shadow-2xl rounded-2xl p-10 outline-none flex flex-col gap-10">
          <div>
            <h1 className="text-2xl text-gray-800">Share</h1>
          </div>
          <div className="flex justify-between text-xs">
            <SocialIcon IconComponent={FaTwitter} label="Twitter" />
            <SocialIcon IconComponent={FaFacebook} label="Facebook" />
            <SocialIcon IconComponent={IoLogoWhatsapp} label="WhatsApp" />
            <SocialIcon IconComponent={AiFillInstagram} label="Instagram" />
          </div>
          <div>
            <h2 className="text-gray-700 text-sm">Page Link</h2>
            <div className="flex justify-between gap-2 mt-2">
              <div className="flex-grow">
                <Input name="copy" type="text" value={currentUrl} readOnly />
              </div>
              <Button className="h-[42px] cursor-copy" onClick={copyUrlToClipboard}>
                Copy
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
