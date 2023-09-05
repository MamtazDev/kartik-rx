import ReactPlayer from 'react-player';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import withStyles from '@mui/styles/withStyles';

import { MyDialogContent, MyDialogTitle, MyDialogActions } from './DialogStyles';

const MyDialogPlayer = withStyles((theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius
  },
  paper: {
    // backgroundColor: theme.palette.primary.dark
  }
}))(Dialog);

const MyDialogTitlePlayer = styled(MyDialogTitle)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: 0,
  paddingBottom: 0,
});

const MyDialogTitleText = styled(Typography)(({
  theme
}) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontFamily: theme.typography.fontFamilyCustom,
  fontSize: theme.typography.h6.fontSize,
  letterSpacing: theme.typography.h6.letterSpacing,
  lineHeight: theme.typography.h6.lineHeight,
}));

const MyDialogContentPlayer = styled(MyDialogContent)(({
  theme
}) => ({
  padding: 0,
  [theme.breakpoints.up('lg')]: {
    width: '800px',
    height: '400px'
  },
  [theme.breakpoints.up('xl')]: {
    width: '1600px',
    height: '800px'
  },
}));

const MyReactPlayer = styled(ReactPlayer)(({
  '& video': {
    outline: 'none'
  }
}));

export {
  MyDialogPlayer,
  MyDialogContentPlayer,
  MyDialogTitlePlayer,
  MyDialogTitleText,
  MyDialogActions,
  MyReactPlayer
};