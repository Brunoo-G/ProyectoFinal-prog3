import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../screens/Home/Home'
import { Ionicons } from '@expo/vector-icons'
import Profile from '../screens/Profile/Profile'
import Search from '../screens/Search/Search'


const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>

        <Tab.Screen 
        name={'Home'} 
        component={Home}
        options={{
          tabBarIcon: () => <Ionicons name='ios-home' color={'#0095F6'} size={35} />,
          headerShown:false
        }}
        />

       <Tab.Screen 
        name='Search' 
        component={Search}
        options={{
          tabBarIcon: () => <Ionicons name="search" size={35} color={'#0095F6'}/>,
          headerShown:false
        }} 
        />

        <Tab.Screen 
        name='Profile' 
        component={Profile}
        options={{
          tabBarIcon: () => <Ionicons name='ios-person-circle' color={'#0095F6'} size={35} />,
          headerShown:false
        }} 
        />
    </Tab.Navigator>
  )
}