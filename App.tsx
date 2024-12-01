import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigation from './navigation/AppNavigation';

const App = () => {
  return (
    <>
      <StatusBar
        translucent={true}
        barStyle="dark-content"
        backgroundColor={'transparent'}
      />
      <AppNavigation />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
