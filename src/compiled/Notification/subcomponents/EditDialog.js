// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: Dialogs/ChildrenDialog.js)

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import AddDialog from 'molecules/Dialogs/AddDialog';
import {ACTION_TYPES} from '../reducer';


import EditDialogDetails from 'compiled/Notification/subcomponents/EditDialogDetails';

const EditDialog = (props) => {
  const { state, onAction, ...rest } = props;
  const onClose = () => {
    onAction({
      type: [ACTION_TYPES.CLOSE_EditDialog,],
      payload: {
        ...state.EditDialog
      }
    });
  };

  return <AddDialog
    isOpen={ state.EditDialog.isOpen }
    title='Edit History'
    // Actions list
    onClose={ onClose }
    displayActions={ false }
    
  >
    <EditDialogDetails onAction={onAction} state={state} {...rest} />
  </AddDialog>;
};

EditDialog.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default EditDialog;