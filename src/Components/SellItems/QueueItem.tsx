import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AddQueue from './AddQueue';
import CardItem from './CardItem';

const QueueItem = () => {
  // store in async storage
  const [queue, setQueue] = useState<Item[]>([]);

  const handleDeleteSell = (name_value: string) => {
    setQueue(prev => {
      const new_value = prev.filter(({name}) => name !== name_value);
      return new_value;
    });
  };

  return (
    <View style={styles.container}>
      <AddQueue setQueue={setQueue} />
      {queue.map(queue => (
        <CardItem
          key={queue.name}
          queue_item={queue}
          handleDeleteSell={handleDeleteSell}
        />
      ))}
    </View>
  );
};

export default QueueItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

type Item = {
  name: string;
  rate: number;
  quantity: number;
};
