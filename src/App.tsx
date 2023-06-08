import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import store, { persistor } from './app/store';
import { themeConfig, GlobalStyles } from './theme';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={themeConfig}>
          <GlobalStyles />
          <>HELLO WORLD</>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
