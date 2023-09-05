// NOTE: ANY CHANGES TO THIS FILE MIGHT BE LOST (template: BaseComponent.js)

import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Page, Header } from 'components';
import SnackbarCustom from 'atoms/snackbar';
import Loader from 'atoms/Loader';
import useAsyncActions from 'hooks/useAsyncActions';
import reducer, { INITIAL_STATE, actionHandlersMap } from './reducer';
import {SNACKBAR_ACTION_TYPES} from 'compiled_helpers/common/snackbarReducer';

{%- for js_header in additional_imports %}
{{ js_header }}
{%- endfor %}

const {{content.name}} = () => {
  // useeffect for the search result
  useEffect(() => {
  }, []);

  const { state, onAction } = useAsyncActions({
    reducer: reducer,
    initialState: INITIAL_STATE,
    actionHandlersMap,
  });

  const onCloseSnackbar = useCallback(() => {
    onAction({type: SNACKBAR_ACTION_TYPES.ON_SNACKBAR_CLOSE_ACTION,});
  }, [onAction]);

  return (
    <Page title='{{ content.title }}'>
      <Header heading='{{ content.heading }}' subHeading='{{ content.sub_heading }}' />
      {%- for child_component in child_components %}
      <{{ child_component }} onAction={onAction} state={state.app} />
      {%- endfor %}

      {state.globalLoader.display && <Loader />}
      <SnackbarCustom
        isOpen={state.snackbar.isOpen}
        type={state.snackbar.type}
        message={state.snackbar.message}
        onCloseSnackbar={onCloseSnackbar}
        autoInfoOff={false}
      />
    </Page>
  );
};

{{content.name}}.propTypes = {
  onAction: PropTypes.func,
  state: PropTypes.object,
};

export default {{content.name}};
