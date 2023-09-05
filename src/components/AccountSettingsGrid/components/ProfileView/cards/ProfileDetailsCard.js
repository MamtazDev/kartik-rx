import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';

import Email from '@material-ui/icons/Email';
import Phone from '@material-ui/icons/Phone';
import Smartphone from '@material-ui/icons/Smartphone';
import Person from '@material-ui/icons/Person';
import Event from '@material-ui/icons/Event';
import Language from '@material-ui/icons/Language';

const ROLE_TYPE = {
  ROLE_PROFESSOR: 'Professor',
  ROLE_STUDENT: 'Student',
  ROLE_ADMIN: 'Admin',
};

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
    marginBottom: theme.spacing(2)
  },
  detail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.icon
  }
}));

const ProfileDetailsCard = props => {
  const {className, currentUser, ...rest} = props;
  const classes = useStyles();

  const detailsData = currentUser ? [
    {key: 'email', icon: <Email/>, value: currentUser.email},
    {key: 'phoneNumber', icon: <Phone/>, value: currentUser.phoneNumber},
    {key: 'mobileNumber', icon: <Smartphone/>, value: currentUser.mobileNumber},
    {key: 'roleType', icon: <Person/>, value: ROLE_TYPE[currentUser.roleType] ? ROLE_TYPE[currentUser.roleType] : '-'},
    {key: 'semester', icon: <Event/>, value: currentUser.semester},
    {key: 'locale', icon: <Language/>, value: currentUser.locale},
  ] : null;

  const renderProfileDetails = (detail, index) => {
    return(
      detail.value ?
        <Box key={detail.key + `_${index}`} className={classes.detail}>
          <Box className={classes.detailIcon}>
            {detail.icon}
          </Box>
          <Typography
            color='textSecondary'
            variant='body1'
          >
            {detail.value}
          </Typography>
        </Box>
        : null
    );
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems='center'
          display='flex'
          flexDirection='column'
        >
          <Avatar
            className={classes.avatar}
            src={null}
          />
          <Typography
            color='textPrimary'
            gutterBottom
            variant='h3'
          >
            {currentUser.firstName} {currentUser.lastName}
          </Typography>
          <Box>
            {detailsData.map(renderProfileDetails)}
          </Box>
        </Box>
      </CardContent>
      {/* To be implemented changing profile picture */}
      {/* <Divider />
      <CardActions>
        <Button
          color='primary'
          fullWidth
          variant='text'
        >
          Upload picture
        </Button>
      </CardActions> */}
    </Card>
  );
};

ProfileDetailsCard.propTypes = {
  className: PropTypes.string,
  currentUser: PropTypes.object
};

export default ProfileDetailsCard;