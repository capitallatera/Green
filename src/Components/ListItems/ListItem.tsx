import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../redux/hook';
import {singleInventory} from '../../redux/module/inventory';

const calculateWidth = (screenWidth: number, percentage: number) =>
  screenWidth * percentage;

type Item = {
  id: string;
  name: string;
  rate: string | number | null;
  quantity: string | number | null;
};
const ListItem = ({id, name, rate, quantity}: Item) => {
  const {width} = useWindowDimensions();
  const widthDimension = calculateWidth(width, 0.8);
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const dispatch = useAppDispatch();

  const handleNavigation = async () => {
    const payloadBuilder = {id: id};
    setLoad(true);
    const {payload} = await dispatch(singleInventory(payloadBuilder));
    setLoad(false);

    if (payload?._id) {
      navigation.navigate('Edit', {payload});
    } else {
      // Display Toast
      console.log('Something went wrong');
    }
  };

  return (
    <Pressable
      style={[
        styles.conatainer,
        styles.positionRelative,
        {width: widthDimension},
      ]}
      onPress={handleNavigation}>
      {load ? (
        <ActivityIndicator style={styles.indicator} size={'large'} />
      ) : (
        <>
          <Text style={styles.text}>Name :{name}</Text>
          <Text style={styles.text}>Rate :{rate}</Text>
          <Text style={styles.text}>Quantity :{quantity}</Text>
        </>
      )}
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  conatainer: {
    borderWidth: 1,
    borderColor: '#e0afa0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
  transformRotate: {
    transform: [{rotate: '45deg'}],
  },
  positionRelative: {
    position: 'relative',
  },
  closeButton: {
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  indicator: {height: 80},
});
