import palette from '../palette';

export default {
  styleOverrides: {
    root: {
    },
    input: {
      // padding: '18.5px 14px !important',
      '&::placeholder': {
        opacity: 1,
        color: palette.text.secondary
      }
    }
  }
};
