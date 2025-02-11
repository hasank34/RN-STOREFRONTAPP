import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import {store, persistor} from './src/store/store';
import {theme} from './src/theme';

const App = () => {
  return (
    <SafeAreaProvider>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <AppNavigator />
            <Toast position="top" topOffset={60} visibilityTime={2000} />
          </PaperProvider>
        </PersistGate>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default App;
