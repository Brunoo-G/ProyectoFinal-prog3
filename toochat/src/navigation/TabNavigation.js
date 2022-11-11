import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons'
import Profile from '../screens/Profile/Profile'
import Search from '../screens/Search/Search'
import NewPosts from '../screens/NewPost/NewPost'
import HomeNavigation from './HomeNavigation'

const Tab = createBottomTabNavigator()

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>

        <Tab.Screen 
        name={'HomeNavigation'} 
        component={HomeNavigation}
        options={{
          tabBarIcon: () => <Ionicons name='ios-home' color={'#0095F6'} size={35} />,
          headerShown:false
        }}
        />

       <Tab.Screen 
        name='Search' 
        component={Search}
        options={{
          tabBarIcon: () => <FontAwesome name="search" size={35} color={'#0095F6'}/>,
          headerShown:false
        }} 
        />

       <Tab.Screen 
        name='NewPost' 
        component={NewPosts}
        options={{
          tabBarIcon: () => <Entypo name="squared-plus" size={38} color={'#0095F6'}/>,
          headerShown:false
        }} 
        />

        <Tab.Screen 
        name='Profile' 
        component={Profile}
        options={{
          tabBarIcon: () => <Ionicons name='ios-person-circle' color={'#0095F6'} size={40} />,
          headerShown:false
        }} 
        />
    </Tab.Navigator>
  )
}