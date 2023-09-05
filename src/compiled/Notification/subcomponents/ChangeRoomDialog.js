// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: Dialogs/ChildrenDialog.js)

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import AddDialog from 'molecules/Dialogs/AddDialog';
import {ACTION_TYPES} from '../reducer';


import ChangeRoom from 'compiled/Notification/subcomponents/ChangeRoom';

const ChangeRoomDialog = (props) => {
  const { state, onAction, ...rest } = props;
  const onClose = () => {
    onAction({
      type: [ACTION_TYPES.CLOSE_ChangeRoomDialog,],
      payload: {
        ...state.ChangeRoomDialog
      }
    });
  };

  return <AddDialog
    isOpen={ state.ChangeRoomDialog.isOpen }
    title='Change Patient Room'
    // Actions list
    onClose={ onClose }
    displayActions={ false }
    maxWidth='md'
  >
    <ChangeRoom onAction={onAction} state={state} {...rest} />
  </AddDialog>;
};

ChangeRoomDialog.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default ChangeRoomDialog;