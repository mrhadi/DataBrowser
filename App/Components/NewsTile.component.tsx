import * as React from 'react';
import { Text, TouchableOpacity, PressableProps, StyleSheet, Image, View } from 'react-native';

import { NewsType } from '../flow';
import { Author } from './Author.component';

interface NewsTileProps extends PressableProps {
  newsData: NewsType
  onNewsPress: () => void
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: 400,
    borderRadius: 11,
    marginHorizontal: 30,
    marginTop: 30,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    shadowColor: 'black',
    overflow: 'hidden',
  },
});

export const NewsTile = (props: NewsTileProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onNewsPress}>
      <Image source={{ uri: props.newsData.image }} style={{ width: '100%', height: 200, marginBottom: 5 }} />
      <View style={{ margin: 10, flex: 1 }}>
        <Text numberOfLines={2} style={{ color: 'seagreen', fontSize: 18 }}>{props.newsData.title}</Text>
        <Text numberOfLines={5} style={{ color: 'darkslategrey', fontSize: 12, marginTop: 5, flex: 1 }}>{props.newsData.description}</Text>
        {props.newsData?.author && (<Author name={props.newsData.author} />)}
      </View>
    </TouchableOpacity>
  );
};

