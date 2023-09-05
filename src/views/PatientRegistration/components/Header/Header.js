import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';
import { Typography, Grid, Button,} from '@mui/material';
// import {DatePicker} from '@mui/x-date-pickers';
// import CalendarTodayIcon from '@mui/icons-material/CalendarTodayOutlined';
import EditCreatePatientModal from '../Modal';

const useStyles = makeStyles()(theme => ({
  root: {},
  dates: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  calendarTodayIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Header = props => {
  const { className, ...rest } = props;

  const {classes} = useStyles();
  // const [startDate, setStartDate] = useState(moment().subtract(7, 'days'));
  // const [endDate, setEndDate] = useState(moment());
  // const [selectEdge, setSelectEdge] = useState(null);
  // const [calendarDate, setCalendarDate] = useState(moment());
  const [eventModal, setEventModal] = useState({
    open: false,
    event: null
  });

  const handleNewPatientClick = info => {
    setEventModal({
      open: true,
      patient: {},
    });
  };

  const handleModalClose = () => {
    setEventModal({
      open: false,
      patient: {},
    });
  };

  // const open = Boolean(selectEdge);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        container
        justifyContent='space-between'
        spacing={3}
      >
        <Grid
          item
          lg={6}
          xs={12}
        >
          <Typography
            component='h2'
            gutterBottom
            variant='overline'
          >
            Patient Registration
          </Typography>
          <Typography
            component='h1'
            gutterBottom
            variant='h3'
          >
            Overview
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color='primary'
            variant='contained'
            onClick={() => handleNewPatientClick({})}
          >
            Add patient
          </Button>
        </Grid>
        {/* <Grid
          className={classes.dates}
          item
          lg={6}
          xs={12}
        >
          <ButtonGroup variant="contained">
            <Button onClick={() => handleCalendarOpen('start')}>
              <CalendarTodayIcon className={classes.calendarTodayIcon} />
              {startDate.format('DD MM YYYY')}
            </Button>
            <Button onClick={() => handleCalendarOpen('end')}>
              <CalendarTodayIcon className={classes.calendarTodayIcon} />
              {endDate.format('DD MM YYYY')}
            </Button>
          </ButtonGroup>
        </Grid> */}
      </Grid>
      {/* <DatePicker
        maxDate={moment()}
        onAccept={handleCalendarAccept}
        onChange={handleCalendarChange}
        onClose={handleCalendarClose}
        open={open}
        style={{ display: 'none' }} // Temporal fix to hide the input element
        value={calendarDate}
        variant="dialog"
      /> */}
      <EditCreatePatientModal eventModal={eventModal} handleModalClose={handleModalClose} />
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

Header.defaultProps = {};

export default Header;
