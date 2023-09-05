import TextField from 'components/Form/components/TextField';

export const FIELD_KEYS_LEFT = {
  NEW_PASSWORD: 'newPassword'
};

export const INITIAL_FIELD_VALUES_LEFT = {
  [FIELD_KEYS_LEFT.NEW_PASSWORD]: {
    val: '',
    isError: false,
    helperText: ''
  }
};

export const FIELDS_LEFT = {
  [FIELD_KEYS_LEFT.NEW_PASSWORD]: {
    renderer: TextField,
    renderOptions: {
      type: 'password',
      label: 'Password',
      required: true
    },
  }
};