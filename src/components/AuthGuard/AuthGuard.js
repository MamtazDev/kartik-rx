import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import useRouter from 'utils/useRouter';
import { loadCurrentUser } from 'actions';
import Loader from 'atoms/Loader';


const authLoginPath = '/auth/login';
const authRegisterPath = '/auth/register';

const AuthGuard = props => {
  const { children } = props;

  const session = useSelector(state => state.session);
  const router = useRouter();
  const dispatch = useDispatch();
  const [renderRoutes, setRenderRoutes] = useState(false);

  useEffect(() => {
    if (!session.isCurrentUserLoaded) {
      setRenderRoutes(false);
      dispatch(loadCurrentUser());
    }
  }, [session.isCurrentUserLoaded, dispatch]);

  useEffect(() => {
    if (session.isCurrentUserLoaded) {
      setRenderRoutes(true);
      if (!session.loggedIn || !session.user) {
        if (router.location.pathname !== authLoginPath && router.location.pathname !== authRegisterPath)
          router.history.push(authLoginPath);

        return;
      } else if (session.loggedIn && router.location.pathname === authLoginPath) {
        router.history.push('/');
        return;
      }
    }
  }, [router, session]);

  if (!renderRoutes)
    return <Loader />;

  return <>{children}</>;
};


AuthGuard.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.array.isRequired
};

AuthGuard.defaultProps = {
  roles: []
};

export default AuthGuard;
