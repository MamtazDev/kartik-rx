import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';

const getPosition = (props) => {
  if(props.relative)
    return 'relative';

  if(props.fixed)
    return 'fixed';

  return 'absolute';
};

const Loader = (props) => (
  <CircularProgress
    style={{
      position: getPosition(props),
      top: '50%',
      left: '50%',
    }}
  />
);

Loader.propTypes = {
  relative: PropTypes.bool,
  fixed: PropTypes.bool,
};

Loader.defaultProps = {
  relative: false,
  fixed: false,
};

export default Loader;
