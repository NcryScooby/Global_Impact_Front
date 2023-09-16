import theme_light from '@assets/images/theme_light.png';
import theme_dark from '@assets/images/theme_dark.png';
import { useTheme } from '@hooks/useTheme';
import { Button } from '@components/ui/Button';
import { useAuth } from '@hooks/useAuth';

export const Settings = () => {
  const { theme, singleTheme } = useTheme();
  const { signOut } = useAuth();

  const setLightTheme = () => {
    singleTheme('light');
  };

  const setDarkTheme = () => {
    singleTheme('dark');
  };

  return (
    <>
      <div className="sm:ml-64 font-system-ui">
        <div className="mt-0 p-8 lg:p-12 flex justify-center flex-col gap-2">
          <div className="flex justify-between">
            <h1 className="text-3xl lg:text-4xl font-bold text-black-600 dark:text-white mb-10">
              Settings
            </h1>
            <Button onClick={signOut} className="dark:bg-white dark:text-primary">
              Logout
            </Button>
          </div>
          <div>
            <ul className="flex gap-8">
              <div>
                <li className="text-primary dark:text-white text-lg">Theme preferences</li>
                <p className="text-gray-700 dark:text-gray-400 text-sm">
                  Choose how Global Impact looks to you.
                </p>
              </div>
            </ul>
          </div>
          <div className="flex flex-col lg:flex-row w-full gap-8 mt-16">
            <div
              onClick={setLightTheme}
              className={`border rounded-b-[4px] rounded-t-[4px] cursor-pointer
              ${theme === 'light' ? 'border-gray-300' : 'border-black-500'}`}
            >
              <img src={theme_light} alt="light theme" className="w-96 rounded-t-[4px]" />
              <div
                className={`flex h-12 rounded-b-[4px] border-t
                ${theme === 'light' ? 'border-t-gray-300' : 'border-t-black-500'}`}
              >
                <label className="flex items-center gap-2 text-sm text-primary dark:text-white ml-2 cursor-pointer">
                  <input
                    readOnly
                    type="radio"
                    name="theme"
                    value="light"
                    className="cursor-pointer"
                    checked={theme === 'light'}
                  />
                  Light Theme
                </label>
              </div>
            </div>
            <div
              onClick={setDarkTheme}
              className={`border rounded-b-[4px] rounded-t-[4px] cursor-pointer
                ${theme === 'dark' ? 'border-black-300' : 'border-gray-200'}`}
            >
              <img src={theme_dark} alt="dark theme" className="w-96 rounded-t-[4px]" />
              <div
                className={`flex h-12 rounded-b-[4px] border-t ${
                  theme === 'dark' ? 'border-t-black-300' : 'border-t-gray-200'
                }`}
              >
                <label className="flex items-center gap-2 text-sm text-primary dark:text-white ml-2 cursor-pointer">
                  <input
                    readOnly
                    type="radio"
                    name="theme"
                    value="dark"
                    className="cursor-pointer"
                    checked={theme === 'dark'}
                  />
                  Dark Theme
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
