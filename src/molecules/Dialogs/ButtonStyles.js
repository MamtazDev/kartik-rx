import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import withStyles from '@mui/styles/withStyles';

const ButtonCustom = withStyles((theme) => ({
  root: {
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.primary.dark,
    '&:hover': {
      // fontWeight: theme.typography.fontWeightBold,
      backgroundColor: theme.palette.primary.main,
    },
  },
}))(Button);

const MyButton = styled(ButtonCustom)(({
  theme
}) => ({
  color: theme.palette.primary.contrastText,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body2.fontSize,
  letterSpacing: theme.typography.body2.letterSpacing,
  lineHeight: theme.typography.body2.lineHeight,
  borderRadius: theme.shape.borderRadius,
}));

const MyIconButtonAdd = styled(IconButton)(({
  theme
}) => ({
  // color: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.iconplato.green.main,
    background: theme.palette.iconplato.green.verylight,
  },
}));

const MyIconButtonDelete = styled(IconButton)(({
  theme
}) => ({
  // color: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.iconplato.red.main,
    background: theme.palette.iconplato.red.verylight,
  },
}));

const MyIconButtonRegular = styled(IconButton)(({
  theme
}) => ({
  color: theme.palette.primary.main,
}));

export {
  MyButton,
  MyIconButtonAdd,
  MyIconButtonDelete,
  MyIconButtonRegular
};