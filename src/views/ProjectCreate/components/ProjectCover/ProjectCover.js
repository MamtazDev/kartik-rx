import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';
import { Card, CardHeader, CardContent } from '@mui/material';

import { FilesDropzone } from 'components';

const useStyles = makeStyles()(() => ({
  root: {}
}));

const ProjectCover = props => {
  const { className, ...rest } = props;

  const {classes} = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title='Project cover' />
      <CardContent>
        <FilesDropzone />
      </CardContent>
    </Card>
  );
};

ProjectCover.propTypes = {
  className: PropTypes.string
};

export default ProjectCover;
