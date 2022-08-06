/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Game from './components/game.js';

const App = () => {
 return (
  <View style = {styles.container}>
  <Game/>
  </View>
  );
};

const styles = StyleSheet.create({
  container:{
    justifyContent: 'space-between',
    backgroundColor: '#123'
  },
});

export default App;
