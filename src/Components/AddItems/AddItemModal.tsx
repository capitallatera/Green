import {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {addVegetable, vegetableState} from '../../redux/module/vegetable';

interface AddModal {
  visible: boolean;
  handleAdd: (n: string) => void;
  setModal: (b: boolean) => void;
}

const calculateWidth = (screenWidth: number, percentage: number) =>
  screenWidth * percentage;

const AddItemModal = ({visible, handleAdd, setModal}: AddModal) => {
  const [name, setName] = useState<string>('');
  const {load} = useAppSelector(vegetableState);

  const {width, height} = useWindowDimensions();
  const widthDimension = calculateWidth(width, 0.8);

  const asyncHandleAdd = async () => {
    await handleAdd(name);
    setName('');
  };
  const handleClose = () => {
    setModal(false);
  };

  return (
    <Modal visible={visible}>
      <View style={{...styles.container, position: 'relative'}}>
        <Pressable onPressIn={() => handleClose()} style={styles.close}>
          <Text style={styles.closeText}>+</Text>
        </Pressable>
        <TextInput
          style={{...styles.dropdown, width: widthDimension}}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
        />

        <Pressable
          style={{
            ...styles.dropdown,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            width: widthDimension,
          }}
          disabled={load}
          onPress={asyncHandleAdd}>
          {load ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <Text style={{fontSize: 20}}>Add</Text>
          )}
        </Pressable>
      </View>
    </Modal>
  );
};

export default AddItemModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'red',

    margin: 5,
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
  heading: {
    color: '#001427',
    borderRadius: 7,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 10,

    textAlign: 'center',
    fontSize: 25,
  },
  close: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 50,
    height: 50,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    transform: [{rotate: '45deg'}],
    fontSize: 34,
  },
});
