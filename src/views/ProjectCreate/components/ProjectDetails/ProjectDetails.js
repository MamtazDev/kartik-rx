import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';
import { Card, CardHeader, CardContent } from '@mui/material';

import { RichEditor } from 'components';

const useStyles = makeStyles()(() => ({
  root: {}
}));

const ProjectDetails = props => {
  const { className, ...rest } = props;

  const {classes} = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title='Project details' />
      <CardContent>
        <RichEditor placeholder='Say something about the product...' />
      </CardContent>
    </Card>
  );
};

ProjectDetails.propTypes = {
  className: PropTypes.string
};

export default ProjectDetails;
