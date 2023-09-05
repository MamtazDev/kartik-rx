import React from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@material-ui/styles/makeStyles';

import ResetPasswordCard from './cards/ResetPasswordCard';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '2%'
  },
}));

const SecurityView = props => {
  const { onSavePasswordChange } = props;
  const classes = useStyles();

  return (
    <ResetPasswordCard 
      className={classes.root}
      onSavePasswordChange={onSavePasswordChange} 
    />
  );
};

SecurityView.propTypes = {
  className: PropTypes.string,
  onSavePasswordChange: PropTypes.func
};

export default SecurityView;