import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import store, { persistor } from './app/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <ThemeProvider theme={themeConfig}> */}
        <>HELLO WORLD</>
        {/* </ThemeProvider> */}
      </PersistGate>
    </Provider>
  );
}

export default App;
