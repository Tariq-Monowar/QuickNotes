import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useThemeColors } from '../context/ThemeContext';

const Search = () => {
  const {appBackground, textColor, wave} = useThemeColors();
  return (
    <View style={{height: '100%', backgroundColor: appBackground}}>
      <Text>Search</Text>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})