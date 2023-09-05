import TextField from 'components/Form/components/TextField';

export const FIELD_KEYS_RIGHT = {
  CONFIRM_NEW_PASSWORD: 'confirmNewPassword'
};

export const INITIAL_FIELD_VALUES_RIGHT = {
  [FIELD_KEYS_RIGHT.CONFIRM_NEW_PASSWORD]: {
    val: '',
    isError: false,
    helperText: ''
  }
};

export const FIELDS_RIGHT = {
  [FIELD_KEYS_RIGHT.CONFIRM_NEW_PASSWORD]: {
    renderer: TextField,
    renderOptions: {
      type: 'password',
      label: 'Password confirmation',
      required: true
    },
  }
};