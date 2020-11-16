module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [],
  variants: {},
  plugins: [require('@tailwindcss/ui')],
  theme: {
    minHeight: {
      200: '40rem',
      225: '45rem',
      250: '50rem',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
      screen: '100vh',
    },
    maxHeight: {
      200: '40rem',
      225: '45rem',
      250: '50rem',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
      screen: '100vh',
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px)
      md: '768px',
      // => @media (min-width: 768px)
      lg: '1024px',
      // => @media (min-width: 1024px)
      xl: '1440px',
      // => @media (min-width: 1440px)
      '2xl': '1680px',
      // => @media (min-width: 1680px)
      '3xl': '1920px',
      // => @media (min-width: 1920px)
    },
    extend: {
      opacity: {
        10: '0.1',
        20: '0.2',
        80: '0.8',
        90: '0.9',
        95: '0.95',
      },
      spacing: {
        44: '11rem',
        46: '11.5rem',
        82: '18rem',
        100: '20rem',
        118: '22rem',
        136: '24rem',
        154: '26rem',
        166: '28rem',
        172: '29rem',
        178: '30rem',
        184: '31rem',
        190: '32rem',
        200: '40rem',
        380: '64rem',
      },
      backgroundImage: (theme) => ({
        question_banner_image:
          'url(https://images.unsplash.com/photo-1557318041-1ce374d55ebf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80)',
      }),
    },
  },
};
