import postNotFound from '@assets/lottie/notfound.json';
import Lottie from 'lottie-react';

export const PostNotFound = () => (
  <Lottie animationData={postNotFound} loop={true} className="w-96" />
);
