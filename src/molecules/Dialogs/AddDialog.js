import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ConfirmCancelButtons from 'molecules/ConfirmCancelButtons';
import { makeStyles } from 'tss-react/mui';

import Zoom from '@mui/material/Zoom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


const useStyles = makeStyles()((theme) => ({
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: theme.typography.h4.fontSize,
  },
}));

const AddDialog = (props) => {
  const { isOpen, title, onClose, onSubmit, confirmText, children, displayActions, maxWidth } = props;
  const { classes } = useStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Zoom}
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle className={classes.dialogTitle}>
        {title}
        <IconButton onClick={onClose} size='large'>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      {displayActions && <DialogActions>
        <ConfirmCancelButtons
          onCancel={onClose}
          onConfirm={onSubmit}
          cancelText='Cancel'
          confirmText={confirmText}
        />
      </DialogActions>}
    </Dialog>
  );
};

AddDialog.defaultProps = {
  confirmText: 'Save',
  displayActions: true,
  maxWidth: 'sm',
};

AddDialog.propTypes = {
  isOpen: PropTypes.bool,
  open: PropTypes.bool,
  confirmText: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
  displayActions: PropTypes.bool,
  maxWidth: PropTypes.string,
};

export default AddDialog;