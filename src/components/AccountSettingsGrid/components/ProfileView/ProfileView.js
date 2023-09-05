import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import makeStyles from '@material-ui/styles/makeStyles';

import ColumnGrid from 'atoms/grids/ColumnGrid';
import ProfileDetailsCard from './cards/ProfileDetailsCard';
import ProfileEditCard from './cards/ProfileEditCard';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '2%'
  },
  profileDetail: {
    margin: theme.spacing(1)
  },
  profileEdit: {
    margin: theme.spacing(1)
  }
}));

const ProfileView = props => {
  const { className, currentUser, onSaveProfileChange } = props;
  const classes = useStyles();

  return (
    <ColumnGrid
      className={clsx(classes.root, className)}
      columnLeftSize={4}
      columnRightSize={8}
      columnLeft={
        <ProfileDetailsCard
          className={classes.profileDetail}
          currentUser={currentUser}
        />
      }
      columnRight={
        <ProfileEditCard
          className={classes.profileEdit}
          currentUser={currentUser}
          onSaveProfileChange={onSaveProfileChange}
        />
      }
    />
  );
};

ProfileView.propTypes = {
  className: PropTypes.string,
  currentUser: PropTypes.object,
  onSaveProfileChange: PropTypes.func
};

export default ProfileView;