import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';
import { Typography, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles()(theme => ({
  root: {},
  addIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Header = props => {
  const { className, ...rest } = props;

  const {classes} = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems='flex-end'
        container
        justifyContent='space-between'
        spacing={3}
      >
        <Grid item>
          <Typography
            component='h2'
            gutterBottom
            variant='overline'
          >
            Browse projects
          </Typography>
          <Typography
            component='h1'
            variant='h3'
          >
            See the latest opportunities
          </Typography>
        </Grid>
        <Grid item>
          <Button
            color='primary'
            component={RouterLink}
            to='/projects/create'
            variant='contained'
          >
            <AddIcon className={classes.addIcon} />
            Submit project
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
