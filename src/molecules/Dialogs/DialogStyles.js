import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

import { styled } from '@mui/material/styles';

import withStyles from '@mui/styles/withStyles';

const MyDialog = withStyles((theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius
  },
}))(Dialog);

const MyDialogTitle = withStyles((theme) => ({
  root: {
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.h5.fontSize,
    letterSpacing: theme.typography.h5.letterSpacing,
    lineHeight: theme.typography.h5.lineHeight,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
}))(DialogTitle);

const MyDialogContent = styled(DialogContent)(({
  theme
}) => ({
  paddingBottom: theme.spacing(2),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4)
}));

const MyDialogActions = styled(DialogActions)(({
  theme
}) => ({
  paddingBottom: theme.spacing(2),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4)
}));

const TextFieldCustom = withStyles((theme) => ({
  root: {
    '& label': {
      background: theme.palette.common.white,
      fontFamily: theme.typography.fontFamily,
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.body1.fontSize,
      letterSpacing: theme.typography.body1.letterSpacing,
    },
    '& label.Mui-focused': {
      color: theme.palette.primary,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.h6.fontSize,
      letterSpacing: theme.typography.h6.letterSpacing,
    },
  },
}))(TextField);

const MyTextField = styled(TextFieldCustom)(({
  theme
}) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3)
}));

const MyTextFieldComments  = styled(MyTextField)(({
  marginBottom: 0
}));

export {
  MyDialog,
  MyDialogTitle,
  MyDialogContent,
  MyDialogActions,
  MyTextField,
  MyTextFieldComments
};