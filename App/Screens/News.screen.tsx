import React, { useContext, useRef, useState } from 'react';
import { View, TextInput, Button, Keyboard, FlatList } from 'react-native';

import { NewsTile } from '../Components/NewsTile.component';

import { MainFlowContext, MainFlowStateType, NewsType } from '../flow';

function NewsScreen() {
  const [keyword, setKeyword] = useState('');
  const searchInputRef = useRef<TextInput>(null);
  const flatListRef = useRef<FlatList>(null);

  const mainFlow: MainFlowStateType = useContext(MainFlowContext);

  const news = mainFlow.getNews();

  const onChangeText = (text: string) => {
    setKeyword(text);
  };

  const onSearch = async () => {
    Keyboard.dismiss();
  };

  const onReset = async () => {
    setKeyword('');
  };

  const handleOnNewsPress = (item: NewsType) => {
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
        <TextInput
          ref={searchInputRef}
          style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, flexGrow: 1 }}
          placeholder="Search News"
          onChangeText={onChangeText}
          value={keyword}
        />
        <Button
          title="Search"
          onPress={onSearch}
        />
        <Button
          title="Reset"
          onPress={onReset}
        />
      </View>
      <FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={news}
        renderItem={({ item }) => (<NewsTile newsData={item} onNewsPress={() => handleOnNewsPress(item)} />)}
        ListFooterComponent={<View style={{ margin: 100 }} />}
      />
    </View>
  );
}

export default NewsScreen;
