/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#111111',
        'secondary': '#fafafa',
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
