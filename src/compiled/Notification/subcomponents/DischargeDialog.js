// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: Dialogs/ChildrenDialog.js)

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import AddDialog from 'molecules/Dialogs/AddDialog';
import {ACTION_TYPES} from '../reducer';


import DischargeDialogDetails from 'compiled/Notification/subcomponents/DischargeDialogDetails';

const DischargeDialog = (props) => {
  const { state, onAction, ...rest } = props;
  const onClose = () => {
    onAction({
      type: [ACTION_TYPES.CLOSE_DischargeDialog,],
      payload: {
        ...state.DischargeDialog
      }
    });
  };

  return <AddDialog
    isOpen={ state.DischargeDialog.isOpen }
    title='Discharge Patient'
    // Actions list
    onClose={ onClose }
    displayActions={ false }
    
  >
    <DischargeDialogDetails onAction={onAction} state={state} {...rest} />
  </AddDialog>;
};

DischargeDialog.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default DischargeDialog;