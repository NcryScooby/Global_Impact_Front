import Lottie from 'lottie-react';
import pageNotFound from '../../../../assets/lottie/404.json';

export const PageNotFound = () => (
  <Lottie animationData={pageNotFound} loop={true} className="w-64" />
);
