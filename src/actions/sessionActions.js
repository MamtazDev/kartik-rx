import {axiosInstance} from './helpers';

export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGIN_SUCCEEDED = 'SESSION_LOGIN_SUCCEEDED';
export const SESSION_LOGIN_FAILED = 'SESSION_LOGIN_FAILED';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';
export const LOAD_CURRENT_USER = 'LOAD_CURRENT_USER';
export const LOAD_CURRENT_USER_SUCCEEDED = 'LOAD_CURRENT_USER_SUCCEEDED';
export const LOAD_CURRENT_USER_FAILED = 'LOAD_CURRENT_USER_FAILED';

export const DUMMY_USER = {
  first_name: 'ABC',
  last_name: 'XV',
  email: 'demo@D.io',
  avatar: '/images/react.png',
  bio: 'Software Dev',
  role: 'ADMIN',
};


export const login = (payload) => (dispatch) => {
  // TODO: disable login button
  dispatch({
    type: SESSION_LOGIN,
  });

  const params = new URLSearchParams();
  params.append('username', payload.email);
  params.append('password', payload.password);

  axiosInstance.post('/login/access-token', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  }).then((data) => {

    console.log('Access  token', data);

    localStorage.setItem('accessToken', data.data.access_token);
    loginSucceeded(dispatch, {
      ...data.data,
      user: {...DUMMY_USER}
    });

  }).catch((e) => {
    loginFailed(dispatch);
  });
};

export const loginSucceeded = (dispatch, payload) =>
  dispatch({
    type: SESSION_LOGIN_SUCCEEDED,
    payload
  });

export const loginFailed = (dispatch) =>
  dispatch({
    type: SESSION_LOGIN_FAILED,
  });

export const logout = () => (dispatch) => {
  localStorage.setItem('accessToken', '');
  axiosInstance.get('/logout').then((data) => {
    dispatch({
      type: SESSION_LOGOUT
    });
  }).catch((e) => {
    loginFailed(dispatch);
  });
};

export const loadCurrentUser = () => (dispatch) => {
  dispatch({
    type: LOAD_CURRENT_USER,
  });

  axiosInstance.post('/login/test-token', {}, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  }).then((data) => {
    loginSucceeded(dispatch, {
      user: {...DUMMY_USER}
    });
  }).catch((e) => {
    loginFailed(dispatch);
  });
};
