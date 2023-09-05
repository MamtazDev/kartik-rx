import React, {useState} from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MomentUtils from '@date-io/moment';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import {LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { renderRoutes } from 'react-router-config';

import theme from './theme';
import { configureStore } from './store';
import routes from './routes';
import {
  ScrollReset,
  GoogleAnalytics,
  CookiesNotification
} from './components';
import './mixins/chartjs';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
import './mock';
import './assets/scss/index.scss';
import AuthGuard from 'components/AuthGuard/AuthGuard';
import { LoaderContext, SnackbarContext } from 'globalContexts';
import Loader from 'atoms/Loader';
import SnackbarCustom from 'atoms/snackbar';
import { getSnackbarErrorObj, INITIAL_SNACKBAR_DATA } from 'atoms/snackbar/helpers';

const history = createBrowserHistory();
const store = configureStore();

const App = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [snackbarData, setSnackbarData] = useState({ ...INITIAL_SNACKBAR_DATA });

  const onCloseSnackbar = () => {
    setSnackbarData({ ...INITIAL_SNACKBAR_DATA });
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {/* <MuiPickersUtilsProvider utils={MomentUtils}> */}
          <StoreProvider store={store}>
            <Router history={history}>
              <ScrollReset />
              <GoogleAnalytics />
              <CookiesNotification />
              <AuthGuard>
                <SnackbarContext.Provider value={{ setSnackbarData }}>
                  <LoaderContext.Provider value={{ setShowLoader }}>
                    {renderRoutes(routes)}
                    {showLoader && <Loader />}
                    <SnackbarCustom
                      isOpen={snackbarData.isOpen}
                      type={snackbarData.type}
                      message={snackbarData.message}
                      onCloseSnackbar={onCloseSnackbar}
                      autoInfoOff={false}
                    />
                  </LoaderContext.Provider>
                </SnackbarContext.Provider>
              </AuthGuard>
            </Router>
          </StoreProvider>
          {/* </MuiPickersUtilsProvider> */}
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
