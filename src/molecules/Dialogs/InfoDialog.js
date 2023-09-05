import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import Zoom from '@mui/material/Zoom';

import * as Style from './AddDialogStyles';

const InfoDialog = (props) => {
  const { isOpen, title, onClose, children } = props;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Style.MyDialog
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Zoom}
    >
      <Style.MyDialogTitle
        disableTypography
      >
        {title}
      </Style.MyDialogTitle>
      <Style.MyDialogContent>
        {children}
      </Style.MyDialogContent>
      <Style.MyDialogActions>
        <Style.MyButton
          onClick={handleClose}
        >
            Close
        </Style.MyButton>
      </Style.MyDialogActions>
    </Style.MyDialog>
  );
};

InfoDialog.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default InfoDialog;