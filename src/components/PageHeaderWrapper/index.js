/* eslint-disable no-undef */
import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from 'tss-react/mui';
import Page from 'components/Page';
import Header from 'components/Header';
import { Box } from '@mui/material';

const useStyles = makeStyles()(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(2, 2, 2, 3),
  },
}));

const PageHeaderWrapper = props => {
  const { title, heading, subHeading, children } = props;
  const {classes} = useStyles();
  const [showLoader, setShowLoader] = useState(false);

  return (
    <Page
      className={classes.root}
      title={title}
    >
      <Header heading={heading} subHeading={subHeading} />
      <Box mt={1}>
        {children}
      </Box>
    </Page>
  );
};

PageHeaderWrapper.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};

export default PageHeaderWrapper;
