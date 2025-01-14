import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './Screens/Splash.screen';

import { navigationRef } from './routing';

export type MainFlowStateType = {
  onSplashScreenDone: Function
  init: Function
}

const MainFlowNavigationStack = createNativeStackNavigator();

export const MainFlowContext = React.createContext<MainFlowStateType | null>(
  null
);

const MainFlowState = (navigation): MainFlowStateType => {
  const init = () => {
  };

  const onSplashScreenDone = () => {
  };

  return {
    init,
    onSplashScreenDone,
  };
};

export const MainFlow = () => {
  const navigation = navigationRef;
  const mainFlowState: MainFlowStateType = MainFlowState(navigation);

  mainFlowState.init();

  return (
    <MainFlowContext.Provider value={mainFlowState}>
      <MainFlowNavigationStack.Navigator initialRouteName="SplashScreen">
        <MainFlowNavigationStack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      </MainFlowNavigationStack.Navigator>
    </MainFlowContext.Provider>
  );
};

