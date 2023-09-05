import TextField from 'components/Form/components/TextField';

export const FIELD_KEYS_LEFT = {
  MOBILE_PHONE_NUMBER: 'mobilePhoneNumber',
};

export const INITIAL_FIELD_VALUES_LEFT = {
  [FIELD_KEYS_LEFT.MOBILE_PHONE_NUMBER]: {
    val: ''
  }
};

export const FIELDS_LEFT = {
  [FIELD_KEYS_LEFT.MOBILE_PHONE_NUMBER]: {
    renderer: TextField,
    renderOptions: {
      label: 'Phone Number (Mobile)'
    },
  }
};