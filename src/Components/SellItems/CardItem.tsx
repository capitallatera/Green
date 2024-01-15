import {Pressable, StyleSheet, Text, View} from 'react-native';

const CardItem = ({queue_item, handleDeleteSell}: Card) => {
  const {name, rate, quantity} = queue_item;
  const price = quantity * rate;

  return (
    <View key={name} style={{...card_styles.card}}>
      <View style={card_styles.item_layout_one}>
        <Text style={card_styles.item_heading}>{name}</Text>
        <Text style={card_styles.item_sub_heading}>{rate} Rs/Kg</Text>
      </View>

      <View style={[card_styles.item_layout_two]}>
        <View>
          <Text style={card_styles.item_heading_two}>{quantity}</Text>
          <Text style={card_styles.item_sub_heading}>quantity</Text>
        </View>
      </View>

      <View>
        <Text style={card_styles.item_heading_two}>Rs.{price}</Text>
        <Text style={card_styles.item_sub_heading}>price</Text>
      </View>

      <View style={[card_styles.item_layout_two]}>
        <Pressable
          style={card_styles.item_button}
          onPress={() => handleDeleteSell(name)}>
          <Text style={[card_styles.textSize20, card_styles.transform]}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CardItem;

type Item = {
  name: string;
  rate: number;
  quantity: number;
};

type Card = {
  queue_item: Item;
  handleDeleteSell: (name: string) => void;
};

const card_styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    marginHorizontal: 15,
    marginVertical: 8,
  },
  item_layout_one: {
    alignItems: 'center',
  },
  item_heading: {
    fontSize: 18,
  },
  item_button: {
    borderWidth: 1,
    borderRadius: 25,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item_layout_two: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  item_heading_two: {
    fontSize: 18,
    textAlign: 'center',
  },
  item_sub_heading: {
    fontSize: 12,
    textAlign: 'center',
  },
  textSize20: {fontSize: 20},
  transform: {transform: [{rotate: '45deg'}]},
});
