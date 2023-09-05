import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
// import { useTranslation } from 'react-i18next';

import { green } from '@mui/material/colors';

import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(theme => ({
  confirmButton: {
    color: theme.palette.white,
    backgroundColor: green[600],
    '&:hover': {
      backgroundColor: green[900],
    }
  },
  cancelButton: {
    marginLeft: '2%',
  },
}));


const ConfirmCancelButtons = (props) => {
  const { onConfirm, onCancel, confirmText, cancelText, confirmDisabled, cancelDisabled } = props;
  const {classes} = useStyles();
  // const { t, i18n } = useTranslation('buttons');

  return (
    <>
      <Button
        variant='contained'
        className={classes.cancelButton}
        size='small'
        disabled={cancelDisabled}
        onClick={onCancel}
      >
        { cancelText }
        {/* {t(cancelText)} */}
      </Button>
      <Button
        variant='contained'
        className={classes.confirmButton}
        size='small'
        disabled={confirmDisabled}
        onClick={onConfirm}
      >
        { confirmText }
        {/* { t(confirmText) } */}
      </Button>
    </>
  );
};

ConfirmCancelButtons.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,

  confirmDisabled: PropTypes.bool,
  cancelDisabled: PropTypes.bool,
};

ConfirmCancelButtons.defaultProps = {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  confirmDisabled: false,
  cancelDisabled: false,
};

export default ConfirmCancelButtons;