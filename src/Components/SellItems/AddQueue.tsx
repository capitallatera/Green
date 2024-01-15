import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from '../../redux/hook';
import {inventoryState} from '../../redux/module/inventory';

const AddQueue = ({setQueue}) => {
  const {data: inventory} = useAppSelector(inventoryState);
  const [items, setItems] = useState<ItemObject>({
    isDisplayed: false,
    data: [],
    selected: {
      _id: '',
      name: '',
      quantity: 0,
      rate: 0,
      isDisclosable: false,
    },
  });
  const [quantity, setQuantity] = useState(0);
  const handleAddClick = () => {
    setQuantity(1);
    setItems(prev => ({...prev, isDisplayed: true}));
  };

  const handleItemSelect = (data: VegetableData) => {
    setItems(prev => {
      return {...prev, selected: data, isDisplayed: false};
    });
  };

  const handleDelete = () => {
    setItems(prev => {
      return {...prev, selected: {}};
    });
  };

  useEffect(() => {
    setItems((prev: any) => ({...prev, data: inventory}));
  }, [inventory, setItems]);

  const displayItems = items.isDisplayed
    ? renderItem(items.data, handleItemSelect, setItems)
    : null;

  const {name, rate} = items.selected;
  const isPresent = !!name;
  const dynamic_name = quantity ? 'minus' : 'delete';

  const addItem = () => {
    setQueue(prev => {
      const data = [...prev, {name, rate, quantity}];
      return data;
    });
    setItems(prev => ({
      ...prev,
      isDisplayed: false,
      selected: {
        _id: '',
        name: '',
        quantity: 0,
        rate: 0,
        isDisclosable: false,
      },
    }));
  };

  const handleQuantity = (type: string): void => {
    if (type === 'delete') {
      handleDelete();
    }
    setQuantity(prev => {
      if (type === 'minus') {
        return prev - 1;
      }

      if (type === 'plus') {
        return prev + 1;
      }
      return 1;
    });
  };

  return (
    <View>
      <View style={[styles.add_btn]}>
        {/* Add Button */}
        {!isPresent ? (
          <TouchableOpacity
            style={styles.item_layout_one}
            onPressIn={handleAddClick}>
            <Text style={styles.add_text}>+</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.item_layout_one}>
            <View>
              <Text style={styles.item_heading}>{name}</Text>
              <Text style={styles.item_sub_heading}>{rate} Rs/Kg</Text>
            </View>
            <TouchableOpacity onPressIn={handleDelete}>
              <Text style={styles.delete_item}>+</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Display quantity */}
        {isPresent ? (
          <View style={[styles.item_layout_two]}>
            <View>
              <Text style={styles.item_heading_two}>{quantity}</Text>
              <Text style={styles.item_sub_heading}>quantity</Text>
            </View>
          </View>
        ) : null}

        {/* Change quantity */}
        {isPresent ? (
          <View style={styles.tripleBtn}>
            <View style={styles.increaseDecrease}>
              <Pressable
                style={styles.item_button}
                onPress={() => handleQuantity(dynamic_name)}>
                {quantity ? (
                  <Text style={styles.textSize20}>-</Text>
                ) : (
                  <Text style={[styles.textSize20, styles.transform]}>+</Text>
                )}
              </Pressable>
              <Pressable
                style={styles.item_button}
                onPress={() => handleQuantity('plus')}>
                <Text style={styles.textSize20}>+</Text>
              </Pressable>
            </View>
            <View>
              <Pressable style={styles.item_button} onPress={() => addItem()}>
                <Text style={styles.textSize20}>*</Text>
              </Pressable>
            </View>
          </View>
        ) : null}
      </View>

      {items.isDisplayed ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollableItems}>
          {displayItems}
        </ScrollView>
      ) : null}
    </View>
  );
};

export default AddQueue;

const renderItem = (
  data: VegetableData[],
  handleItemSelect: (i: VegetableData) => void,
  setItems: (i: ItemObject) => void,
) => {
  return (
    <View style={styles.dropdown_list}>
      {data.map(item => {
        const {_id, name} = item;
        return (
          <View key={_id}>
            <Text
              key={_id}
              style={styles.pills}
              onPress={() => handleItemSelect(item)}>
              {name}
            </Text>
          </View>
        );
      })}

      <TouchableOpacity
        style={styles.close}
        onPressIn={() => {
          setItems(prev => {
            return {...prev, isDisplayed: false};
          });
        }}>
        <Text style={styles.plusColor}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

type VegetableData = {
  _id: string;
  name: string;
  isDisclosable: boolean;
};

type ItemObject = {
  isDisplayed: boolean;
  data: Data[];
  selected: Data;
};

type Data = {
  _id: string;
  name: string;
  quantity: number;
  rate: number;
  isDisclosable: boolean;
};

const styles = StyleSheet.create({
  add_btn: {
    paddingLeft: 50,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 20,
    marginHorizontal: 15,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  add_text: {
    fontSize: 50,
  },
  item_button: {
    borderWidth: 1,
    borderRadius: 25,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 3,
  },
  scrollableItems: {
    borderColor: '#6c757d',
    borderWidth: 1,
    borderRadius: 7,
    margin: 15,
    paddingTop: 12,
  },

  item_layout_one: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  item_heading: {
    fontSize: 18,
  },
  item_sub_heading: {
    fontSize: 12,
  },
  delete_item: {
    transform: [{rotate: '45deg'}],
    marginLeft: 20,
    fontSize: 30,
    color: '#EF5350',
  },
  item_layout_two: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  item_heading_two: {
    fontSize: 18,
    textAlign: 'center',
  },
  increaseDecrease: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
  },
  textSize20: {fontSize: 20},
  transform: {transform: [{rotate: '45deg'}]},
  tripleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Rendered Items
  dropdown_list: {
    paddingBottom: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pills: {
    borderWidth: 1,
    borderColor: '#6c757d',
    padding: 10,
    borderRadius: 25,
    margin: 5,
  },
  close: {
    borderWidth: 1,
    borderColor: '#EF5350',
    borderRadius: 25,
    marginHorizontal: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-around',
    transform: [{rotate: '45deg'}],
  },
  plusColor: {color: '#EF5350'},
});
