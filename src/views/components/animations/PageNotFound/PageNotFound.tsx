import pageNotFound from '@assets/lottie/404.json';
import Lottie from 'lottie-react';

export const PageNotFound = () => (
  <Lottie animationData={pageNotFound} loop={true} className="w-64" />
);
