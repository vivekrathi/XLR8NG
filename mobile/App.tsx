/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import SuperDealsScreen from './src/screens/SuperDealsScreen';
import LatestDealsScreen from './src/screens/LatestDealsScreen';
import PriceDropsScreen from './src/screens/PriceDropsScreen';
import EventsScreen from './src/screens/EventsScreen';
import DealDetailScreen from './src/screens/DealDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#6c757d',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>🏠</Text>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Super Deals"
        component={SuperDealsScreen}
        options={{
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>🔥</Text>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Latest"
        component={LatestDealsScreen}
        options={{
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>📈</Text>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Price Drops"
        component={PriceDropsScreen}
        options={{
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>💸</Text>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          tabBarIcon: ({color}) => <Text style={{color, fontSize: 20}}>🎉</Text>,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DealDetail"
            component={DealDetailScreen}
            options={{title: 'Deal Details'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;