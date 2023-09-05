
export const LOADER_ACTION_TYPES = {
  SHOW_GLOBAL_LOADER: 'SHOW_GLOBAL_LOADER',
  HIDE_GLOBAL_LOADER: 'HIDE_GLOBAL_LOADER',
};

export const INITIAL_LOADER_DATA = {
  display: false,
};


const loaderReducer = (state = {...INITIAL_LOADER_DATA}, action) => {
  switch (action.type) {
  
  case LOADER_ACTION_TYPES.SHOW_GLOBAL_LOADER:
    return {
      display: true,
    };
  case LOADER_ACTION_TYPES.HIDE_GLOBAL_LOADER:
    return {
      display: false,
    };
  default:
    return state;
  }
};

export default loaderReducer;