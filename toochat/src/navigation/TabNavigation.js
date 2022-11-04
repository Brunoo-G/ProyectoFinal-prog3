import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../screens/Home/Home'
import {FontAwesome} from '@expo/vector-icons'
import Profile from '../screens/Profile/Profile'


const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator>
        <Tab.Screen 
        name={'Home'} 
        component={Home}
        options={{
            tabBarIcon: () => <FontAwesome name='home' color={'red'} size={32} />,
            headerShown:false
        }}
        />
        <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}