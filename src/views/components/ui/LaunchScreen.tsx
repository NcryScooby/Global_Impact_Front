import { Transition } from '@headlessui/react';
import logo from '@assets/images/logo.svg';
import { Spinner } from './Spinner';

interface LaunchScreenProps {
  isLoading: boolean;
}

export const LaunchScreen = ({ isLoading }: LaunchScreenProps) => {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-250"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-250"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-primary fixed top-0 left-0 h-full w-full grid place-items-center">
        <div className="flex flex-col items-center">
          <img loading="lazy" src={logo} alt="Logo" className="h-52" />
          <Spinner className="text-primary fill-white" />
        </div>
      </div>
    </Transition>
  );
};
