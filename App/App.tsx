import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootStack from './routing.tsx';

function App(): React.JSX.Element {
  return (
      <SafeAreaProvider>
        <RootStack />
      </SafeAreaProvider>
  );
}

export default App;
