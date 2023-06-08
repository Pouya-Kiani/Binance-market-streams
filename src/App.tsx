import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import store, { persistor } from './app/store';
import { themeConfig, GlobalStyles } from './theme';
import { PriceTable } from './pages/priceTable/PriceTable';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={themeConfig}>
          <GlobalStyles />
          <PriceTable />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
