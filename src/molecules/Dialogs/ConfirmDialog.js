import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import ConfirmCancelButtons from 'molecules/ConfirmCancelButtons';
import { makeStyles } from 'tss-react/mui';

import Zoom from '@mui/material/Zoom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles()((theme) => ({
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const ConfirmDialog = (props) => {
  const { isOpen, title, message, onClose, onSubmit } = props;
  const {classes} = useStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Zoom}
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle className={classes.dialogTitle}>
        <Typography variant='h4'>{title}</Typography>
        <IconButton onClick={onClose} size='large'>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <ConfirmCancelButtons
          onCancel={onClose}
          onConfirm={onSubmit}
          cancelText='Cancel'
          confirmText='Yes'
        />
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
};


export default ConfirmDialog;


