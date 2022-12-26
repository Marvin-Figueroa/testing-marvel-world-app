import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { HashLoader } from 'react-spinners';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={<HashLoader color='#dc143c' />}
        persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
