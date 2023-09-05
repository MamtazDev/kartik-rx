import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';
import { Typography, Grid, Button, Hidden } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';

const useStyles = makeStyles()(theme => ({
  root: {},
  summaryButton: {
    backgroundColor: theme.palette.white
  },
  barChartIcon: {
    marginRight: theme.spacing(1)
  },
  image: {
    width: '100%',
    maxHeight: 400
  }
}));

const Header = props => {
  const { className, ...rest } = props;

  const {classes} = useStyles();
  const session = useSelector(state => state.session);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems='center'
        container
        justifyContent='space-between'
        spacing={3}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <Typography
            component='h2'
            gutterBottom
            variant='overline'
          >
            Home
          </Typography>
          <Typography
            component='h1'
            gutterBottom
            variant='h3'
          >
            Good Morning, {session.user.first_name}
          </Typography>
          <Typography
            gutterBottom
            variant='subtitle1'
          >
            Here’s what’s happening with your projects today
          </Typography>
          <Button
            className={classes.summaryButton}
            edge='start'
            variant='contained'
          >
            <BarChartIcon className={classes.barChartIcon} />
            View summary
          </Button>
        </Grid>
        <Hidden mdDown>
          <Grid
            item
            md={6}
          >
            <img
              alt='Cover'
              className={classes.image}
              src='/images/undraw_growth_analytics_8btt.svg'
            />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
