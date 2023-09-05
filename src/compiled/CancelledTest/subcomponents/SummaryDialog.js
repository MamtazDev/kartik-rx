// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: Dialogs/ChildrenDialog.js)

import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import AddDialog from 'molecules/Dialogs/AddDialog';
import {ACTION_TYPES} from '../reducer';


import SummaryTable from 'compiled/CancelledTest/subcomponents/SummaryTable';

const SummaryDialog = (props) => {
  const { state, onAction, ...rest } = props;
  const onClose = () => {
    onAction({
      type: [ACTION_TYPES.CLOSE_SummaryDialog,],
      payload: {
        ...state.SummaryDialog
      }
    });
  };

  return <AddDialog
    isOpen={ state.SummaryDialog.isOpen }
    title='Cancelled Tests'
    // Actions list
    onClose={ onClose }
    displayActions={ false }
    
  >
    <SummaryTable onAction={onAction} state={state} {...rest} />
  </AddDialog>;
};

SummaryDialog.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default SummaryDialog;