import Lottie from 'lottie-react';
import blog from '../../../assets/lottie/blog.json';

export const Blog = () => (
  <Lottie animationData={blog} loop={true} className="w-full" />
);
