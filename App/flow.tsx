import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './Screens/Splash.screen';
import NewsScreen from './Screens/News.screen';

import ApiService from './Services/api';
import { navigationRef } from './routing';
import { logConsole, logAPIError } from './Services/LogTracker';

export type MainFlowStateType = {
  onSplashScreenDone: Function
  init: Function
}

const MainFlowNavigationStack = createNativeStackNavigator();

export const MainFlowContext = React.createContext<MainFlowStateType | null>(
  null
);

const MainFlowState = (navigation, apiService): MainFlowStateType => {
  const getNewsData = async (category: string) => {
    try {
      const res = await apiService.getNews(category.toLowerCase());
      const data = res?.data?.data;
      logConsole('News read: ' + data.length);
    } catch (err) {
      logAPIError(err);
    }
  };

  const init = () => {
    getNewsData('general');
  };

  const onSplashScreenDone = () => {
    navigation.navigate('NewsScreen');
  };

  return {
    init,
    onSplashScreenDone,
  };
};

export const MainFlow = () => {
  const navigation = navigationRef;
  const apiService = ApiService();
  const mainFlowState: MainFlowStateType = MainFlowState(navigation, apiService);

  mainFlowState.init();

  return (
    <MainFlowContext.Provider value={mainFlowState}>
      <MainFlowNavigationStack.Navigator initialRouteName="SplashScreen">
        <MainFlowNavigationStack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <MainFlowNavigationStack.Screen
            name="NewsScreen"
            component={NewsScreen}
            options={{ headerShown: false }}
        />
      </MainFlowNavigationStack.Navigator>
    </MainFlowContext.Provider>
  );
};

