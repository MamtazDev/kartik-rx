import React from 'react';
import {
  Button,
  ButtonGroup,
} from '@mui/material';

const CreateBillButton = (props) => {
  const {patient} = props;

  return <ButtonGroup>
    <Button
      color='primary'
      //   component={RouterLink}
      size='small'
      variant='outlined'
      disabled={!patient.ipno}
    >
      OP
    </Button>
    <Button
      color='primary'
      //   component={RouterLink}
      size='small'
      variant='outlined'
      disabled={patient.ipno}
    >
      IP
    </Button>
    <Button
      color='primary'
      //   component={RouterLink}
      size='small'
      variant='outlined'
      disabled={!patient.ipno}
    >
      P
    </Button>
  </ButtonGroup>;
};

export default CreateBillButton;