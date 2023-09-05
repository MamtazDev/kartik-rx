import React, {useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';

import useAsyncActions from 'hooks/useAsyncActions';
import reducer, { INITIAL_STATE, ACTION_TYPES } from './reducer';
import actionHandlersMap from './actionHandlers';

import PageFrame from 'atoms/frame';
import TabsRow from 'atoms/tabs/TabsRow';
import SnackbarCustom from 'atoms/snackbar';

import Content from 'molecules/Content';

import ProfileView from './components/ProfileView/ProfileView';
import SecurityView from './components/SecurityView/SecurityView';
import StudentFeeManageGrid from 'components/AdminApp/FeeManageGrid/StudentFeeManage/StudentFeeManageGrid';

const AccountSettingsGrid = props => {
  const { match: { params: { tabid } }, admin } = props;

  const baseUrl = admin ? '/admin/home/account' : '/home/account';

  // TODO: find better way to use the route
  const tabRouteMap = {
    '/': baseUrl,
    '/security': `${baseUrl}/security`,
    '/fees': `${baseUrl}/fees`,
  };

  const { state, onAction } = useAsyncActions({
    reducer: reducer,
    initialState: INITIAL_STATE,
    actionHandlersMap,
  });

  useEffect(() => {
    if (!state.loaded || state.isSaveProfileSuccess) {
      onAction({
        type: ACTION_TYPES.LOAD_USER
      }, []);
    }
  }, [onAction, state.loaded, state.isSaveProfileSuccess]);

  const onSaveProfileChange = useCallback((homePhone, mobilePhone) => {
    onAction({
      type: ACTION_TYPES.EDIT_USER,
      payload: {
        firstName: state.currentUser.firstName,
        lastName: state.currentUser.lastName,
        email: state.currentUser.email,
        phoneNumber: homePhone,
        mobileNumber: mobilePhone,
        roleType: state.currentUser.roleType,
        userGuid: state.currentUser.userGuid
      },
    });
  }, [onAction, state.currentUser]);

  const onSavePasswordChange = useCallback((newPassword) => {
    onAction({
      type: ACTION_TYPES.CHANGE_PASSWORD,
      payload: {
        email: state.currentUser.email,
        password: newPassword
      },
    });
  }, [onAction, state.currentUser]);

  const onTabChange = (tabValue) => {
    props.history.push(tabRouteMap[tabValue]);
  };

  const onCloseSnackbar = useCallback(() => {
    onAction({
      type: ACTION_TYPES.ON_RECORDINGS_SNACKBAR_ACTION,
      payload: {
        isOpen: false,
      },
    });
  }, [onAction]);

  return (
    <PageFrame
      pageTitle={'Settings'}
      actionButtons={[]}
      contentComponent={
        <Content
          loaded={state.loaded}
          dataLength={state.currentUser ? 1 : 0}
          messageNoData={'User not found.'}
        >
          <TabsRow
            tabs={[
              {label: 'General', value: '/'},
              {label: 'Security', value: '/security'},
              {label: 'Fees', value: '/fees'},
            ]}
            tabsView={[
              <ProfileView
                key={'profile_edit'}
                currentUser={state.currentUser}
                onSaveProfileChange={onSaveProfileChange}
              />,
              <SecurityView
                key={'security_edit'}
                onSavePasswordChange={onSavePasswordChange}
              />,
              <StudentFeeManageGrid
                key={'fee_log'}
              />
            ]}
            selectedTab={tabid ? `/${tabid}` : '/'}
            onChange={onTabChange}
            centered={false}
            {...props}
          />
        </Content>
      }
      snackbarComponent={
        <SnackbarCustom
          isOpen={state.isOpenSnackbar}
          type={state.snackbarType}
          message={state.snackbarMessage}
          onCloseSnackbar={onCloseSnackbar}
          autoInfoOff={false}
        />
      }
    />
  );
};

AccountSettingsGrid.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      tabid: PropTypes.string
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    })
  }),
  admin: PropTypes.bool,
};

export default AccountSettingsGrid;