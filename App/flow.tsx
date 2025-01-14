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
  getNews: Function
  searchNews: Function
  onResetSearch: Function
}

export type NewsType = {
  author: string
  title: string
  description: string
  url: string
  source: string
  image: string
  category: string
  language: string
  country: string
  published_at: string
}

export type LocalDataType = {
  newsData: Array<NewsType>
  selectedNews: NewsType | null
}

const localData: LocalDataType = {
  newsData: [],
  selectedNews: null,
};

const MainFlowNavigationStack = createNativeStackNavigator();

export const MainFlowContext = React.createContext<MainFlowStateType | null>(
  null
);

const MainFlowState = (navigation, apiService): MainFlowStateType => {
  const resetLocalData = () => {
    localData.newsData = [];
    localData.selectedNews = null;
  };

  const getNewsData = async (category: string) => {
    try {
      const res = await apiService.getNews(category.toLowerCase());
      const data = res?.data?.data;
      logConsole('News read: ' + data.length);

      localData.newsData = data;
    } catch (err) {
      logAPIError(err);
    }
  };

  const searchNews = async (keyword: string) => {
    try {
      const res = await apiService.searchNews(keyword);
      const data = res?.data?.data;
      logConsole('Search result: ' + data.length);

      localData.newsData = data;
    } catch (err) {
      logAPIError(err);
    }
  };

  const init = () => {
    resetLocalData();
    getNewsData('general');
  };

  const onSplashScreenDone = () => {
    navigation.navigate('NewsScreen');
  };

  const onResetSearch = async () => {
    resetLocalData();

    getNewsData('general');
  };

  const getNews = () => (localData.newsData);

  return {
    init,
    onSplashScreenDone,
    getNews,
    searchNews,
    onResetSearch,
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

