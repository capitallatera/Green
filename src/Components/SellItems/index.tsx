import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import QueueItem from './QueueItem';

const SellItems = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sell Items</Text>
      <QueueItem />
    </View>
  );
};

export default SellItems;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 20,

    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  title: {fontSize: 20},
});
