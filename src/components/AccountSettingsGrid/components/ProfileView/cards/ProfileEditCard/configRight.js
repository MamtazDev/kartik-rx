import TextField from 'components/Form/components/TextField';

export const FIELD_KEYS_RIGHT = {
  HOME_PHONE_NUMBER: 'homePhoneNumber'
};

export const INITIAL_FIELD_VALUES_RIGHT = {
  [FIELD_KEYS_RIGHT.HOME_PHONE_NUMBER]: {
    val: ''
  }
};

export const FIELDS_RIGHT = {
  [FIELD_KEYS_RIGHT.HOME_PHONE_NUMBER]: {
    renderer: TextField,
    renderOptions: {
      label: 'Phone number (Home)'
    },
  }
};