import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { PlusIcon } from 'react-native-heroicons/outline';
import { useThemeColors } from '../context/ThemeContext';

const TouchableComponent =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const Overview = () => {
  const {appBackground, textColor, wave} = useThemeColors();
  const navigation = useNavigation<any>();
  return (
    <>
      <View style={{backgroundColor: appBackground, height: '100%'}}>
        <Text></Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate('search')}>
          <Text style={{color: '#000', fontSize: 30}}>Click</Text>
        </TouchableOpacity> */}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Texteditor')}
        style={{...styles.addBookmarked, backgroundColor: 'gray'}}>
        <PlusIcon size={32} strokeWidth={2} color={'#000'} />
      </TouchableOpacity>
    </>
  );
};

export default Overview;

const styles = StyleSheet.create({

  addBookmarked: {
    width: 60,
    height: 60,
    position: 'absolute',
    zIndex: 10,
    bottom: 25,
    right: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#263147',
    elevation: 3,
  },
});
