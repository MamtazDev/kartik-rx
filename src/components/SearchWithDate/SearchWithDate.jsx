import React from 'react';
import { Button, Card, CardContent, Grid, TextField } from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import { makeStyles } from 'tss-react/mui';
import PropTypes from 'prop-types';


const useStyles = makeStyles()({
  item: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // padding:'20px'
  }
});

const SearchWithDate = (props) => {
  const classes = useStyles();
    
  const { fromDate, setFromDate, toDate, setToDate, onClick } = props;

  return (
    <Card>
      <CardContent>
        <Grid container xs={12}>
          <Grid item xs={3} sm={3} md={3}>
            <DatePicker
              label='From'
              fullWidth
              value={fromDate}
              onChange={(newValue) => {
                setFromDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>

          <Grid item  xs={3} sm={3} md={3}>
            <DatePicker
              label='To'
              fullWidth
              value={toDate}
              onChange={(newValue) => {
                setToDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>

          <Grid item container xs={2} sm={2} md={2} alignItems='center'>
            <Button variant='contained' color='primary' onClick={onClick}>Go</Button>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
};

SearchWithDate.propTypes = {
  fromDate: PropTypes.string.isRequired,
  setFromDate: PropTypes.func.isRequired,
  toDate: PropTypes.string.isRequired,
  setToDate: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchWithDate;