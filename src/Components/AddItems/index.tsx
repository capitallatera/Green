import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AddItemModal from './AddItemModal';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {
  addVegetable,
  getAllData,
  vegetableState,
} from '../../redux/module/vegetable';
import {addInventory, inventoryState} from '../../redux/module/inventory';
import {useNavigation} from '@react-navigation/native';
import {nanoid} from 'nanoid';

const calculateWidth = (screenWidth: number, percentage: number) =>
  screenWidth * percentage;
// const calculateHeight = (screenHeight: number, percentage: number) =>
//   screenHeight * percentage;

// type Data = {_id: string; name: string; isDisclosable: boolean};
// type ItemObject = {
//   isDisplayed: boolean;
//   data: Data[];
// };

type AddNew = {
  id: string;
  vegetable: string;
  rate: number | null;
  quantity: number | null;
};

const AddItems = () => {
  const {width} = useWindowDimensions();
  // const [selected, setSelected] = useState('');
  // const [isModal, setModal] = useState<boolean>(false);
  const [addNew, setAddNew] = useState<AddNew>({
    id: '',
    vegetable: '',
    rate: null,
    quantity: null,
  });
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  // const {data: vegetables} = useAppSelector(vegetableState);
  const {load: inventory_load} = useAppSelector(inventoryState);

  // const [items, setItems] = useState<ItemObject>({
  //   isDisplayed: false,
  //   data: [],
  // });

  const widthDimension = calculateWidth(width, 0.8);
  // const heightDimension = calculateWidth(height, 0.6);

  // const handleItemSelect = (data: VegetableData, type: string) => {
  //   if (type === 'press') {
  //     setSelected(data.name);
  //     handleInputs('name', data.name);
  //     setItems(prev => ({...prev, isDisplayed: false}));
  //   }
  // };

  // const handleDelete = async (id: string) => {
  //   const payload = {id};
  //   await dispatch(deleteVegetable(payload));
  // };

  const fetchVegetable = useCallback(async () => {
    await dispatch(getAllData());
  }, [dispatch]);

  // const handleAdd = async (name: string) => {
  //   const payload = {name};
  //   await dispatch(addVegetable(payload));
  //   setModal(false);
  // };

  const handleAddInventory = async () => {
    const payload = {...addNew, id: nanoid()};
    await dispatch(addInventory(payload));
    // Resolve navigate error
    navigation.navigate('List');
  };

  const handleInputs = (name: string, value: string) => {
    setAddNew(prev => ({...prev, [name]: value}));
  };

  useEffect(() => {
    fetchVegetable();
  }, [fetchVegetable]);

  // useEffect(() => {
  //   const modifiedVegetable =
  //     vegetables.map(item => ({
  //       ...item,
  //       isDisclosable: false,
  //     })) || [];
  //   setItems((prev: any) => ({...prev, data: modifiedVegetable}));
  // }, [vegetables, setItems]);

  // const displayItems = items.isDisplayed
  //   ? renderItem(
  //       items.data,
  //       widthDimension,
  //       handleItemSelect,
  //       setModal,
  //       setItems,
  //     )
  //   : null;

  const addStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    width: widthDimension,
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={{...styles.dropdown, width: widthDimension}}
        placeholder="Vegetable"
        inputMode="text"
        onChangeText={value => handleInputs('vegetable', value)}
      />

      <TextInput
        style={{...styles.dropdown, width: widthDimension}}
        placeholder="Rate"
        inputMode="decimal"
        onChangeText={value => handleInputs('rate', value)}
      />

      <TextInput
        style={{...styles.dropdown, width: widthDimension}}
        placeholder="Quantity"
        inputMode="decimal"
        onChangeText={value => handleInputs('quantity', value)}
      />

      <TouchableOpacity
        style={[styles.dropdown, addStyle]}
        onPressIn={handleAddInventory}>
        {inventory_load ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <Text style={styles.addSize}>Add</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddItems;

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
  pills: {
    borderWidth: 1,
    borderColor: '#6c757d',
    padding: 10,
    borderRadius: 25,
    marginLeft: 10,
    marginBottom: 10,
  },
  dropdown_list: {
    // borderColor: '#6c757d',
    // borderWidth: 1,
    // borderRadius: 7,
    // paddingHorizontal: 20,

    // marginVertical: 10,
    paddingVertical: 20,

    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  add: {
    borderWidth: 1,
    borderColor: '#6c757d',
    borderRadius: 25,
    marginLeft: 10,
    marginBottom: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  close: {
    borderWidth: 1,
    borderColor: '#EF5350',
    borderRadius: 25,
    marginLeft: 10,
    marginBottom: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
    transform: [{rotate: '45deg'}],
  },
  scrollableItems: {
    borderColor: '#6c757d',
    borderWidth: 1,
    borderRadius: 7,
  },
  plusColor: {color: '#EF5350'},
  rotateClose: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  addSize: {fontSize: 20},
});

// type VegetableData = {
//   _id: string;
//   name: string;
//   isDisclosable: boolean;
// };

// const renderItem = (
//   data: VegetableData[],
//   widthDimension: number,
//   handleItemSelect: (i: VegetableData, t: string) => void,
//   setModal: (b: boolean) => void,
//   setItems: (i: ItemObject) => void,
// ) => {
//   const containRender = {
//     width: widthDimension,
//     position: 'relative',
//   };

//   return (
//     <View style={[styles.dropdown_list, containRender]}>
//       {data?.map(item => {
//         const {_id, name} = item;
//         return (
//           <View key={_id}>
//             <Text
//               key={_id}
//               style={styles.pills}
//               onPress={() => handleItemSelect(item, 'press')}>
//               {name}
//             </Text>
//           </View>
//         );
//       }) || null}
//       <TouchableOpacity style={styles.add} onPressIn={() => setModal(true)}>
//         <Text>+</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.close, styles.rotateClose]}
//         onPressIn={() => {
//           setItems((item: ItemObject) => {
//             return {...item, isDisplayed: false};
//           });
//         }}>
//         <Text style={styles.plusColor}>+</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
