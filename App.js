import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TextEditView from './TextEditView';
import SaveHandler from './SaveHandler';


const MainNavigator = createStackNavigator({
  TextEdit: { screen: TextEditView},
  Save: { screen: SaveHandler}
});

const App = createAppContainer(MainNavigator);

export default App;

/*
export default function App() {

  return (
    <TextEditView/>
  );
}*/
