import {ACTION_TYPES} from '../reducer';

import { fetchCurrentUser, editUser, changePassword } from './accountSettingsUtils';

export default {
  [ACTION_TYPES.LOAD_USER]: fetchCurrentUser,
  [ACTION_TYPES.EDIT_USER]: editUser,
  [ACTION_TYPES.CHANGE_PASSWORD]: changePassword,
};


