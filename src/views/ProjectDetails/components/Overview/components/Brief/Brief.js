import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';
import { Card, CardContent } from '@mui/material';

// import { Markdown } from 'components';

const useStyles = makeStyles()(() => ({
  root: {}
}));

const Brief = props => {
  const { brief, className, ...rest } = props;

  const {classes} = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        {/* <Markdown source={brief} /> */}
      </CardContent>
    </Card>
  );
};

Brief.propTypes = {
  brief: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Brief;
