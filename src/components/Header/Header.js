import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';
import { Typography } from '@mui/material';

const useStyles = makeStyles()(() => ({
  root: {},
}));

const Header = (props) => {
  const { heading, subHeading, className, ...rest } = props;

  const {classes} = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography component='h2' gutterBottom variant='overline'>
        {heading}
      </Typography>
      <Typography component='h1' variant='h3'>
        {subHeading}
      </Typography>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};

export default Header;