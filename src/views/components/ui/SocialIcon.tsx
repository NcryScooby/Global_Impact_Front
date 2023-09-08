import { ComponentType } from 'react';
import { ISocialMedias } from '../../../app/interfaces/posts/ISocialMedias';

interface SocialIconProps {
  IconComponent: ComponentType<{ color: string; size: number }>;
  label: ISocialMedias['name'];
}

export const SocialIcon = ({ IconComponent, label }: SocialIconProps) => {
  const shareToSocialMedia = () => {
    const currentUrl = window.location.href;
    const encodedCurrentURL = encodeURIComponent(currentUrl);
    let shareURL = '';

    if (label === 'Twitter') {
      const tweetText = encodeURIComponent('Check out this post on global impact!');
      shareURL = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodedCurrentURL}`;
    } else if (label === 'Facebook') {
      shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedCurrentURL}`;
    } else if (label === 'WhatsApp') {
      const whatsAppText = encodeURIComponent(
        `Check out this post on global impact! ${currentUrl}`
      );
      shareURL = `https://wa.me/?text=${whatsAppText}`;
    }

    if (shareURL) {
      window.open(shareURL);
    }
  };

  return (
    <span>
      <div
        className="cursor-pointer bg-[#f8f9fa] rounded-full p-5 hover:bg-[#e6e6e6]  transition-all duration-200 ease-in-out"
        onClick={shareToSocialMedia}
      >
        <IconComponent color={'#393f48'} size={24} />
      </div>
      <p className="text-center mt-1 text-gray-600">{label}</p>
    </span>
  );
};
