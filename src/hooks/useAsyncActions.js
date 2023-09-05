import { useCallback, useReducer, useRef } from 'react';
import _castArray from 'lodash/castArray';
import _map from 'lodash/map';

const useAsyncActions = ({ actionHandlersMap, reducer, initialState, params }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handlersMapRef = useRef(actionHandlersMap);
  handlersMapRef.current = actionHandlersMap;

  const paramsRef = useRef({ ...params, dispatch, state });
  paramsRef.current = { ...params, dispatch, state };

  const onAction = useCallback(action => {
    let actionHandler;
    
    const actions = _castArray(action.type);
    _map(actions, (_action) => {
      actionHandler = handlersMapRef.current[_action];
      if (actionHandler) {
        actionHandler(action.payload, paramsRef.current);
      }
      dispatch({type: _action, payload: action.payload});
    });
  }, []);

  return {
    state,
    onAction,
  };
};

export default useAsyncActions;
