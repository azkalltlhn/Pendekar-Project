import daisyui from 'daisyui';
import daisyuiThemes from 'daisyui/src/theming/themes';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyuiThemes['light'],
          // primary
          primary: '#0082FF',
          'primary-focus': '#005AD7',
          'primary-content': '#F9FAFB',

          // secondary
          secondary: '#2B3674',
          'secondary-focus': '#3D4CA0',
          'secondary-content': '#F9FAFB',

          // accent
          accent: '#2D54AD',
          'accent-focus': '#3162C4',
          'accent-content': '#F9FAFB',

          // neutral
          neutral: '#3B424E',
          'neutral-focus': '#2A2E37',
          'neutral-content': '#F9FAFB',

          // base
          'base-100': '#FFFFFF',
          'base-200': '#F4F7FE',
          'base-300': '#E6EEFF',
          'base-content': '#111111',

          // state
          info: '#E5CF07',
          success: '#46D414',
          warning: '#F68431',
          error: '#D44214',
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        tahoma: ['Tahoma', ...defaultTheme.fontFamily.sans],
        poppins: ["'Poppins'", ...defaultTheme.fontFamily.sans],
        'dm-sans': ["'DM Sans'", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'vivid-blue': 'rgb(var(--color-vivid-blue) / <alpha-value>)',
        'water-blue': 'rgb(var(--color-water-blue) / <alpha-value>)',
        'cerulean-blue': 'rgb(var(--color-cerulean-blue) / <alpha-value>)',
        'powder-blue': 'rgb(var(--color-powder-blue) / <alpha-value>)',
        'cornflower-blue': 'rgb(var(--color-cornflower-blue) / <alpha-value>)',
        'royal-blue': 'rgb(var(--color-royal-blue) / <alpha-value>)',
        periwinkle: 'rgb(var(--color-periwinkle) / <alpha-value>)',
        'light-steel-blue':
          'rgb(var(--color-light-steel-blue) / <alpha-value>)',
        manatee: 'rgb(var(--color-manatee) / <alpha-value>)',
        'lavender-gray': 'rgb(var(--color-lavender-gray) / <alpha-value>)',
        'light-gradient-from':
          'rgba(var(--color-light-gradient-from) / <alpha-value>)',
        'blue-gradient-to':
          'rgba(var(--color-blue-gradient-to) / <alpha-value>)',
        'mid-gray': 'rgb(var(--color-mid-gray) / <alpha-value>)',
      },
    },
  },
  plugins: [daisyui],
};
