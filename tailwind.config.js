/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#111111',
        'secondary': '#fafafa',
        'black': {
          'DEFAULT': '#000000',
          '100': '#505050',
          '200': '#454545',
          '300': '#383838',
          '400': '#333333',
          '500': '#222222',
          '600': '#151515',
          '700': '#121212',
          '800': '#111111',
          '900': '#050707',
        }
      },
      keyframes: {
        pulselike: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.5)' },
          '100%': { transform: 'scale(1)' },
        },
        pulsedislike: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.85)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'pulselike': 'pulselike 1s ease-in-out',
        'pulsedislike': 'pulsedislike 1s ease-in-out',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui'],
      }
    },
  },
  plugins: [],
});
