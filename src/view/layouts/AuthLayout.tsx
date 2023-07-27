import { Outlet } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export const AuthLayout = () => {
  return (
    <div className="flex w-full h-full">
      <div className="w-full h-full flex items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md px-8">
          <Outlet />
        </div>
      </div>
      <div className="w-1/2 h-full justify-center items-center p-24 flex-col bg-primary hidden lg:flex">
        <img
          src={logo}
          className="object-cover w-full h-full select-none"
        ></img>
        <div>
          <p className="text-white p-10 font-thin tracking-wider text-center">
            Empowering Minds, Inspiring Change.
          </p>
        </div>
      </div>
    </div>
  );
};
