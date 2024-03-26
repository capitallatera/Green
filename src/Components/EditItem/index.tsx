import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAppDispatch} from '../../redux/hook';
import {deleteInventory, editInventory} from '../../redux/module/inventory';

type Item = {
  id: string;
  vegetable: string;
  rate: string | number | null;
  quantity: string | number | null;
};

type ViewNew = {
  item: Item;
  loader: boolean;
  loader_delete: boolean;
};

const calculateWidth = (screenWidth: number, percentage: number) =>
  screenWidth * percentage;

const EditItem = () => {
  const dispatch = useAppDispatch();
  const {width} = useWindowDimensions();
  const widthDimension = calculateWidth(width, 0.8);

  const route = useRoute();
  const navigation = useNavigation();
  const {payload}: any = route.params;

  // const {single} = useAppSelector(inventoryState);
  const [data, setData] = useState<ViewNew>({
    item: {
      id: '',
      vegetable: '',
      rate: '',
      quantity: '',
    },
    loader: false,
    loader_delete: false,
  });

  const handleInput = (name: string, value: string) => {
    setData(prev => {
      let item = {...prev.item, [name]: value};
      return {...prev, item};
    });
  };

  const handleSubmit = async () => {
    const {id, vegetable, rate, quantity} = data.item;
    if (!id || !vegetable || !rate || !quantity) {
      return;
    }
    const payloadBuilder = {id, vegetable, rate, quantity};
    setData(prev => ({...prev, loader: true}));
    await dispatch(editInventory(payloadBuilder));
    setData(prev => ({...prev, loader: false}));
    navigation.navigate('List');
  };

  const handleDelete = async () => {
    const {id} = data.item;
    if (!id) {
      return;
    }
    const payloadBuilder = {id: id, isDelete: true};
    setData(prev => ({...prev, loader_delete: true}));
    await dispatch(deleteInventory(payloadBuilder));
    setData(prev => ({...prev, loader_delete: false}));
    navigation.navigate('List');
  };

  useEffect(() => {
    if (payload?.id) {
      setData(prev => ({...prev, item: payload}));
    }
  }, [payload]);

  const addStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    width: widthDimension,
  };
  const {vegetable, rate, quantity} = data.item;

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={{...styles.dropdown, width: widthDimension}}
        placeholder="Vegetable"
        value={String(vegetable)}
        onChangeText={(value: string) => handleInput('vegetable', value)}
      />

      <TextInput
        style={{...styles.dropdown, width: widthDimension}}
        placeholder="Rate"
        value={String(rate)}
        inputMode="decimal"
        onChangeText={value => handleInput('rate', value)}
      />

      <TextInput
        style={{...styles.dropdown, width: widthDimension}}
        placeholder="Quantity"
        value={String(quantity)}
        inputMode="decimal"
        onChangeText={value => handleInput('quantity', value)}
      />

      <TouchableOpacity
        style={[styles.dropdown, addStyle]}
        onPressIn={handleSubmit}>
        {data.loader ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <Text style={styles.addSize}>Update</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.dropdown, addStyle]}
        onPressIn={handleDelete}>
        {data.loader_delete ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <Text style={styles.addSize}>Delete</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 20,
    borderColor: '#f4d58d',
    borderWidth: 1,
  },
  dropdown: {
    color: '#001427',
    borderColor: '#6c757d',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    height: 65,
  },
  addSize: {fontSize: 20},
});
