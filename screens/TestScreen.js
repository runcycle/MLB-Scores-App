import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MLBGamedayApi from '../api/MLBGamedayApi';
import { DateBar } from './../components/app';

export default class TestScreen extends React.Component {
  
  constructor(props) {
      super(props);

      var url = MLBGamedayApi.getDayURL(2018, 5, 24);

      MLBGamedayApi.getListOfGamesForDay(2018, 5, 24).then(function(urls) {
        
        console.log(urls);

      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.container}>Whoopty Doo</Text>
      </View>
    );
  }
}

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

