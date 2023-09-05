import { ACTION_TYPES } from '../reducer';

const fetchCurrentUser = (payload, { dispatch }) => {
  fetch('/whiteboard/userProfile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => {
    if (!res.ok) {
      return res.json().then(err => {
        let error = {
          message: err.message,
          error: new Error(res.status)
        };
        throw error;
      });
    }
    return res.json();
  }).then(res => {
    dispatch({
      type: ACTION_TYPES.LOAD_USER_SUCCEEDED,
      payload: {
        currentUser: res,
      }
    });
  }).catch(err => {
    console.log('fetchCurrentUser err::', err.error);
    dispatch({
      type: ACTION_TYPES.LOAD_USER_FAILED,
      payload: {
        message: err.message
      }
    });
  });
};

const editUser = (payload, { dispatch }) => {
  fetch('/whiteboard/editUser', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  }).then(res => {
    if (!res.ok) {
      return res.json().then(err => {
        let error = {
          message: err.message,
          error: new Error(res.status)
        };
        throw error;
      });
    }
    setTimeout(() => {
      dispatch({
        type: ACTION_TYPES.EDIT_USER_SUCCEEDED,
        payload: {
          message: 'Successfully edited info.'
        }
      });
    }, 500);
  }).catch(err => {
    console.log('editUser err::', err.error);
    setTimeout(() => {
      dispatch({
        type: ACTION_TYPES.EDIT_USER_FAILED,
        payload: {
          message: err.message
        }
      });
    }, 500);
  });
};

const changePassword = (payload, { dispatch }) => {
  fetch('/whiteboard/changePassword', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  }).then(res => {
    if (!res.ok) {
      return res.json().then(err => {
        let error = {
          message: err.message,
          error: new Error(res.status)
        };
        throw error;
      });
    }
    setTimeout(() => {
      dispatch({
        type: ACTION_TYPES.CHANGE_PASSWORD_SUCCEEDED,
        payload: {
          message: 'Successfully changed password.'
        }
      });
    }, 500);
  }).catch(err => {
    console.log('changePassword err::', err.error);
    setTimeout(() => {
      dispatch({
        type: ACTION_TYPES.CHANGE_PASSWORD_FAILED,
        payload: {
          message: err.message
        }
      });
    }, 500);
  });
};

export {
  fetchCurrentUser,
  editUser,
  changePassword
};