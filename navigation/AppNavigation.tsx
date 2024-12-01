import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TouchableNativeFeedback,
  Easing,
} from 'react-native';
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  Bars3BottomLeftIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import Overview from '../screens/Overview';
import Toolbox from '../drawer/Toolbox';
import {useThemeColors} from '../context/ThemeContext';
import Search from '../screens/Search';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import TextEditor from '../screens/TextEditor';
const {appHeader, textColor, wave, iconColor} = useThemeColors();

// Dynamically decide the correct Touchable component for platform
const TouchableComponent =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

// Reusable Header Icon Component
const HeaderIcon = ({IconComponent, onPress, size, marginLeft = 0}: any) => (
  <View style={{...styles.iconContainer, marginLeft: marginLeft}}>
    <TouchableComponent
      onPress={onPress}
      background={
        Platform.OS === 'android'
          ? TouchableNativeFeedback.Ripple(wave, true)
          : undefined
      }>
      <View style={styles.iconWrapper}>
        <IconComponent size={size} strokeWidth={2} color={textColor} />
      </View>
    </TouchableComponent>
  </View>
);

const DrawerNavigation: FC = () => {
  const navigation = useNavigation<any>();

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator drawerContent={props => <Toolbox {...props} />}>
      <Drawer.Screen
        options={({navigation}) => ({
          headerLeft: () => (
            <HeaderIcon
              IconComponent={Bars3BottomLeftIcon}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              size={27}
              marginLeft={7}
            />
          ),
          headerTitle: () => (
            <Text style={[styles.headerTitle, {color: textColor}]}>
              quick Notes
            </Text>
          ),
          headerRight: () => (
            <View style={styles.iconGroup}>
              <HeaderIcon
                IconComponent={MagnifyingGlassIcon}
                onPress={() => navigation.navigate('search')}
                size={25}
              />
              <HeaderIcon
                IconComponent={EllipsisVerticalIcon}
                onPress={() => {}}
                size={26}
              />
            </View>
          ),

          headerStyle: {
            backgroundColor: appHeader,
          },
        })}
        name="home"
        component={Overview}
      />
    </Drawer.Navigator>
  );
};

const config: any = {
  animation: 'spring',
  config: {
    stiffness: 350, //goti++
    damping: 500,
    // mass: 10,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig: any = {
  animation: 'timing',
  config: {
    // stiffness: 950,
    duration: 250, // --goti
    easing: Easing.linear,
  },
};
const AppNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="overview"
          component={DrawerNavigation}
        />
        <Stack.Screen
          // options={{headerShown: false}}
          options={{
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerStyle: {
              backgroundColor: appHeader,
              elevation: 5,
              shadowColor: iconColor,
            },
          }}
          name="search"
          component={Search}
        />

        <Stack.Screen
          // options={{headerShown: false}}
          options={({ navigation, route }) => ({
            headerLeft: () => (
              <HeaderIcon
                IconComponent={CheckIcon}
                // onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                size={25}
                marginLeft={7}
              />
            ),
            headerTitle: () => (
              <View style={{ flexDirection: 'row' }}>
                <HeaderIcon
                  IconComponent={ArrowUturnLeftIcon}
                  onPress={() => console.log("1") }  
                  size={22}
                  marginLeft={7}
                />
                <HeaderIcon
                  IconComponent={ArrowUturnRightIcon}
                  onPress={() => console.log('2') }  
                  size={22}
                  marginLeft={7}
                />
              </View>
            ),
            headerRight: () => (
              <View style={{marginRight: 5}}>
                <HeaderIcon
                  IconComponent={EllipsisVerticalIcon}
                  onPress={() => {}}
                  size={26}
                />
              </View>
            ),
            headerTitleAlign: 'center',
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            headerStyle: {
              backgroundColor: appHeader,
              elevation: 4,
              shadowColor: iconColor,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          })}
          name="Texteditor"
          component={TextEditor}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'MeriendaBold',
    fontSize: 18,
    marginTop: -8,
  },
  iconContainer: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  iconWrapper: {
    padding: 7,
  },
  iconGroup: {
    flexDirection: 'row',
    marginRight: 9,
    gap: 4,
  },
});
