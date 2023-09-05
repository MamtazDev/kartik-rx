import React from 'react';
// import { makeStyles } from '@mui/material/styles';
import {
  Modal,
  // useTheme,
} from '@mui/material';

import AddEditPatient from '../AddEditPatient';

// const useStyles = makeStyles()(theme => ({
//   root: {},
// }));

const Calendar = (props) => {
  // const {classes} = useStyles();
  // const theme = useTheme();
  const { eventModal, handleModalClose } = props;

  return (
    <Modal
      onClose={handleModalClose}
      open={eventModal.open}
    >
      <AddEditPatient
        event={eventModal.event}
        onAdd={() => { }}
        onCancel={handleModalClose}
        onDelete={() => { }}
        onEdit={() => { }}
      />
    </Modal>
  );
};

export default Calendar;
