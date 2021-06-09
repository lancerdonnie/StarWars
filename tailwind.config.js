module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: '#000',
        },
        alt: {
          DEFAULT: '#FFFF00',
          2: '#494900',
          3: '#373700',
        },
      },
      screens: {
        sm: { max: '640px' },
        md: { max: '768px' },
        lg: { max: '1024px' },
        xl: { max: '1280px' },
        '2xl': { max: '1536px' },
      },
      fontFamily: {
        orb: ['orbitron'],
        meg: ['Megrim'],
        // mont: ['Montserrat'],
        // space: ['Space Mono'],
      },
      // fontSize: {
      //   md: '14px',
      // },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
