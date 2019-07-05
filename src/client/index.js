import React, { useEffect } from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';
import { ThemeProvider } from '@material-ui/styles'
import theme from '../common/theme';
import App from '../common/containers/App';

const store = configureStore(window.__PRELOADED_STATE__);

function Main() {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if(jssStyles){
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  )
}

hydrate(
  <Main />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('../common/containers/App', () => {
    hydrate(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>,
      document.getElementById('root')
    );
  });
}
