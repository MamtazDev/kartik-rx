import { colors } from '@mui/material';

export default {
  styleOverrides: {
    root: {
      backgroundColor: colors.blueGrey[50],
      color: colors.blueGrey[900]
    },
    deletable: {
      '&:focus': {
        backgroundColor: colors.blueGrey[100]
      }
    }
  }
};
