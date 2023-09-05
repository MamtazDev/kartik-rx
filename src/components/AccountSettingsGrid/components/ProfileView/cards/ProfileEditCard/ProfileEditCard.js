import React, {useCallback, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';

import ColumnGrid from 'atoms/grids/ColumnGrid';
import SettingsCard from 'molecules/SettingsCard';

import Form from 'components/Form';

import { FIELD_KEYS_LEFT, FIELDS_LEFT, INITIAL_FIELD_VALUES_LEFT } from './configLeft';
import { FIELD_KEYS_RIGHT, FIELDS_RIGHT, INITIAL_FIELD_VALUES_RIGHT} from './configRight';

const useStyles = makeStyles((theme) => ({
  root: {},
  formLeft: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  formRight: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(1)
  }
}));

const ProfileEditCard = props => {
  const { className, currentUser, onSaveProfileChange } = props;
  const classes = useStyles();

  const [valuesLeft, setValuesLeft] = useState({...INITIAL_FIELD_VALUES_LEFT});
  const [valuesRight, setValuesRight] = useState({...INITIAL_FIELD_VALUES_RIGHT});

  useEffect(() => {
    if (!_isEmpty(currentUser)) {
      setValuesLeft(prevValues => ({
        ...prevValues,
        [FIELD_KEYS_LEFT.MOBILE_PHONE_NUMBER]: {
          ...prevValues[FIELD_KEYS_LEFT.MOBILE_PHONE_NUMBER],
          val: currentUser.mobileNumber ? currentUser.mobileNumber : ''
        }
      }));
      setValuesRight(prevValues => ({
        ...prevValues,
        [FIELD_KEYS_RIGHT.HOME_PHONE_NUMBER]: {
          ...prevValues[FIELD_KEYS_RIGHT.HOME_PHONE_NUMBER],
          val: currentUser.phoneNumber ? currentUser.phoneNumber : ''
        }
      }));
    }
  }, [currentUser, setValuesLeft, setValuesRight]);

  const onChangeLeft = useCallback(({value, key}) => {
    setValuesLeft(prevValues => ({ ...prevValues, [key]: {...prevValues[key], val: value} }));
  }, [setValuesLeft]);

  const onChangeRight = useCallback(({value, key}) => {
    setValuesRight(prevValues => ({ ...prevValues, [key]: {...prevValues[key], val: value} }));
  }, [setValuesRight]);

  const handleOnSaveChange = useCallback(() => {
    var mobilePhoneVal = valuesLeft[FIELD_KEYS_LEFT.MOBILE_PHONE_NUMBER].val;
    var homePhoneVal = valuesRight[FIELD_KEYS_RIGHT.HOME_PHONE_NUMBER].val;

    onSaveProfileChange(homePhoneVal, mobilePhoneVal);
  }, [valuesLeft, valuesRight, onSaveProfileChange]);

  return (
    <SettingsCard
      className={clsx(classes.root, className)}
      title='Profile'
      subheader='The information can be edited'
      contentComponents={
        <ColumnGrid
          columnLeftSize={6}
          columnRightSize={6}
          columnLeft={
            <Box className={classes.formLeft} >
              <Form key={'edit_profile_left'} fields={FIELDS_LEFT} onChange={onChangeLeft} values={valuesLeft} />
            </Box>
          }
          columnRight={
            <Box className={classes.formRight}>
              <Form key={'edit_profile_right'} fields={FIELDS_RIGHT} onChange={onChangeRight} values={valuesRight} />
            </Box>
          }
        />
      }
      actionButtons={
        <Button
          color='primary'
          variant='contained'
          onClick={handleOnSaveChange}
        >
          Save change
        </Button>
      }
    />
  );
};

ProfileEditCard.propTypes = {
  className: PropTypes.string,
  currentUser: PropTypes.object,
  onSaveProfileChange: PropTypes.func
};

export default ProfileEditCard;