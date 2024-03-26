import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import ListItem from './ListItem';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {getAllData} from '../../redux/module/inventory';
import {useNavigation} from '@react-navigation/native';

const calculateWidth = (screenWidth: number, percentage: number) =>
  screenWidth * percentage;

const ListItems = () => {
  const {width} = useWindowDimensions();
  const widthDimension = calculateWidth(width, 0.8);
  const dispatch = useAppDispatch();
  const {data} = useAppSelector(state => state.inventory);
  const navigation = useNavigation();

  const fetchData = useCallback(async () => {
    await dispatch(getAllData());
  }, [dispatch]);

  const handleAdd = () => {
    // Handle Navigation
    navigation.navigate('Add');
  };

  const handleSell = () => {
    // Handle Navigation
    navigation.navigate('Sell');
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Inventory</Text>

      <TextInput
        style={{...styles.dropdown, width: widthDimension}}
        placeholder="Search"
      />

      <Pressable
        style={{...styles.add, width: widthDimension}}
        onPressIn={handleSell}>
        <Text style={styles.textStyle}>Sell Items</Text>
      </Pressable>

      <Pressable
        style={{...styles.add, width: widthDimension}}
        onPressIn={handleAdd}>
        <Text style={styles.textStyle}>Add New Item</Text>
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false}>
        {data?.length
          ? data?.map(({id, vegetable, rate, quantity}) => (
              <ListItem
                key={id}
                id={id}
                name={vegetable}
                rate={rate}
                quantity={quantity}
              />
            ))
          : null}
      </ScrollView>
    </View>
  );
};

export default ListItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  dropdown: {
    color: '#001427',
    borderColor: '#6c757d',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 20,
    marginVertical: 20,
    marginHorizontal: 10,
    height: 65,
  },
  heading: {
    fontSize: 20,
  },
  add: {
    borderWidth: 1,
    borderColor: 'red',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 7,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {fontSize: 20},
});
