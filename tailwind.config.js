/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#111111',
        'secondary': '#F9FAFB',
      },
      keyframes: {
        pulselike: {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.50)', opacity: 0.7 },
        },
        pulsedislike: {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(0.50)', opacity: 0.7 },
        },
      },
      animation: {
        'pulselike': 'pulselike 1s ease-in-out',
        'pulsedislike': 'pulsedislike 1s ease-in-out',
      },
    },
  },
  plugins: [],
};
