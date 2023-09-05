import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {SNACKBAR_TYPES} from './helpers';
import Slide from '@mui/material/Slide';

const getAutoHideDuration = (props) => {
  if(props.type===SNACKBAR_TYPES.INFO && props.autoInfoOff)
    return null;

  if(props.type===SNACKBAR_TYPES.ERROR)
    return null;

  return 3000;
};

const SnackbarCustom = props => {
  const { isOpen, type, message, onCloseSnackbar, vertical, horizontal } = props;

  const SlideTransition = (p) => <Slide {...p}  direction='up' />;

  const handleClose = useCallback(() => {
    onCloseSnackbar();
  }, [onCloseSnackbar]);

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={isOpen}
      autoHideDuration={getAutoHideDuration(props)}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
    >
      <Alert
        elevation={6}
        variant='filled'
        severity={type}
        onClose={handleClose}
      >
        <div
          dangerouslySetInnerHTML={{__html: message}}
        />
      </Alert>
    </Snackbar>
  );
};

SnackbarCustom.propTypes = {
  isOpen: PropTypes.bool,
  autoInfoOff: PropTypes.bool,
  type: PropTypes.string,
  message: PropTypes.string,
  onCloseSnackbar: PropTypes.func,
  vertical: PropTypes.string,
  horizontal: PropTypes.string,
};

SnackbarCustom.defaultProps = {
  autoInfoOff: false,
  vertical: 'bottom',
  horizontal: 'center',
};

export default SnackbarCustom;