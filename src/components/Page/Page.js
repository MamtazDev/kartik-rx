/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import useRouter from 'utils/useRouter';
import { makeStyles } from 'tss-react/mui';

const NODE_ENV = process.env.NODE_ENV;
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

const useStyles = makeStyles()((theme) => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(2, 2, 2, 3),
  },
}));

const Page = props => {
  const { className, title, children, ...rest } = props;

  const router = useRouter();
  const {classes} = useStyles();

  useEffect(() => {
    if (NODE_ENV !== 'production') {
      return;
    }

    if (window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: router.location.pathname,
        page_name: title
      });
    }
  }, [title, router]);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default Page;
