import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';

import ColumnGrid from 'atoms/grids/ColumnGrid';
import SettingsCard from 'molecules/SettingsCard';

import Form from 'components/Form';

import { FIELD_KEYS_LEFT, FIELDS_LEFT, INITIAL_FIELD_VALUES_LEFT } from './configLeft';
import { FIELD_KEYS_RIGHT ,FIELDS_RIGHT, INITIAL_FIELD_VALUES_RIGHT} from './configRight';

const useStyles = makeStyles((theme) => ({
  root: {},
  formLeft: {
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  },
  formRight: {
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  }
}));

const ResetPasswordCard = props => {
  const { className, onSavePasswordChange } = props;
  const classes = useStyles();

  const [valuesLeft, setValuesLeft] = useState({...INITIAL_FIELD_VALUES_LEFT});
  const [valuesRight, setValuesRight] = useState({...INITIAL_FIELD_VALUES_RIGHT});

  const onChangeLeft = useCallback(({value, key}) => {
    setValuesLeft(prevValues => ({ ...prevValues, [key]: {...prevValues[key], val: value, isError: false, helperText: ''} }));
  }, [setValuesLeft]);

  const onChangeRight = useCallback(({value, key}) => {
    setValuesRight(prevValues => ({ ...prevValues, [key]: {...prevValues[key], val: value, isError: false, helperText: ''} }));
  }, [setValuesRight]);

  const handleOnSaveChange = useCallback(() => {
    var newPasswordVal = valuesLeft[FIELD_KEYS_LEFT.NEW_PASSWORD].val;
    var confirmNewPasswordVal = valuesRight[FIELD_KEYS_RIGHT.CONFIRM_NEW_PASSWORD].val;

    if (!newPasswordVal) {
      setValuesLeft(prevValues => ({ ...prevValues, [FIELD_KEYS_LEFT.NEW_PASSWORD]: {...prevValues[FIELD_KEYS_LEFT.NEW_PASSWORD], isError: true, helperText: 'New password is required.'} }));
    }

    if (!confirmNewPasswordVal) {
      setValuesRight(prevValues => ({ ...prevValues, [FIELD_KEYS_RIGHT.CONFIRM_NEW_PASSWORD]: {...prevValues[FIELD_KEYS_RIGHT.CONFIRM_NEW_PASSWORD], isError: true, helperText: 'Password confirmation is required.'} }));
    }

    if (confirmNewPasswordVal !== newPasswordVal) {
      setValuesRight(prevValues => ({ ...prevValues, [FIELD_KEYS_RIGHT.CONFIRM_NEW_PASSWORD]: {...prevValues[FIELD_KEYS_RIGHT.CONFIRM_NEW_PASSWORD], isError: true, helperText: 'Password confirmation must match.'} }));
    }

    if (newPasswordVal && confirmNewPasswordVal && confirmNewPasswordVal == newPasswordVal) {
      onSavePasswordChange(newPasswordVal);
      setValuesLeft({...INITIAL_FIELD_VALUES_LEFT});
      setValuesRight({...INITIAL_FIELD_VALUES_RIGHT});
    }
  }, [valuesLeft, valuesRight, onSavePasswordChange]);

  return (
    <SettingsCard
      className={clsx(classes.root, className)}
      title='Change password'
      subheader=''
      contentComponents={
        <ColumnGrid
          columnLeftSize={6}
          columnRightSize={6}
          columnLeft={
            <Box className={classes.formLeft} >
              <Form
                key={'new_password'}
                fields={FIELDS_LEFT}
                onChange={onChangeLeft}
                values={valuesLeft}
              />
            </Box>
          }
          columnRight={
            <Box className={classes.formRight}>
              <Form
                key={'confirm_new_password'}
                fields={FIELDS_RIGHT}
                onChange={onChangeRight}
                values={valuesRight}
              />
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
          Save password
        </Button>
      }
    />
  );
};

ResetPasswordCard.propTypes = {
  className: PropTypes.string,
  onSavePasswordChange: PropTypes.func
};

export default ResetPasswordCard;