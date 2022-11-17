import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home/Home'
import UsersProfile from '../screens/UsersProfile/UsersProfile'

const Stack = createNativeStackNavigator()

class HomeNavigation extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
            name='Home'
            component={Home}
            options={{
                headerShown:false
            }}
        />

        <Stack.Screen 
          name='UsersProfile'
          component={UsersProfile}
          options={{
            headerShown:false
        }}
        />
        
      </Stack.Navigator>
    )
  }
}

export default HomeNavigation