import React from 'react';
// import Dashboard from './Components/Dashboard'
import AddItems from './Components/AddItems';
import ListItems from './Components/ListItems';
import SellItems from './Components/SellItems';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import EditItem from './Components/EditItem';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="Add" component={AddItems} />
        <Stack.Screen name="List" component={ListItems} />
        <Stack.Screen name="Edit" component={EditItem} />
        <Stack.Screen name="Sell" component={SellItems} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
