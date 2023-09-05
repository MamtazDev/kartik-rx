import * as actionTypes from 'actions';

const initialState = {
  isCurrentUserLoaded: false,
  loggedIn: false,
  loginError: false,
  user: undefined,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {

  // Login
  case actionTypes.SESSION_LOGIN: {
    return {
      ...state,
      isCurrentUserLoaded: false,
      loggedIn: false,
      loginError: false,
      user: undefined,
    };
  }

  case actionTypes.SESSION_LOGIN_SUCCEEDED: {
    return {
      ...state,
      loggedIn: true,
      isCurrentUserLoaded: true,
      loginError: false,
      user: action.payload.user,
    };
  }

  case actionTypes.SESSION_LOGIN_FAILED: {
    return {
      ...state,
      loginError: true,
      isCurrentUserLoaded: true,
      loggedIn: false,
      user: undefined,
    };
  }

  // Load current user
  case actionTypes.LOAD_CURRENT_USER: {
    return {
      ...state,
      isCurrentUserLoaded: false,
    };
  }

  case actionTypes.SESSION_LOGOUT: {
    return {
      ...state,
      loggedIn: false,
      isCurrentUserLoaded: false,
      loginError: false,
      user: undefined,
    };
  }

  default: {
    return state;
  }
  }
};

export default sessionReducer;
