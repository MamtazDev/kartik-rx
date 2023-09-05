import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import AddDialog from './AddDialog';
import _filter from 'lodash/filter';
import _map from 'lodash/map';

const ListDetailsDialog = (props) => {
  const { listData, buttonText, onButtonClick, ...rest } = props;
  return (
    <AddDialog {...rest}>
      {_map(listData, (item) => (
        <Grid container key={item.label}>
          <Grid item my={1} display='flex'>
            <Typography variant='subtitle1'>
              {item.label} :
            </Typography>
            <Typography variant='subtitle1' sx={{ fontSize: 16, fontWeight: 500 }}>
              &nbsp;{item.value}
            </Typography>
          </Grid>
        </Grid>
      ))}
      <Grid item style={{ marginTop: '20px' }}>
        <Button
          variant='contained'
          color='primary'
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </Grid>
    </AddDialog>
  );
};

ListDetailsDialog.defaultProps = {
  buttonText: 'Proceed',
};

ListDetailsDialog.propTypes = {
  // AddDialog props
  isOpen: PropTypes.bool,
  open: PropTypes.bool,
  confirmText: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  displayActions: PropTypes.bool,
  maxWidth: PropTypes.string,

  listData: PropTypes.array.isRequired,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
};

export default ListDetailsDialog;