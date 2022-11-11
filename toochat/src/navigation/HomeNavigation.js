import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home/Home'
import Comments from '../screens/Comments/Comments'

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
            name='Comments'
            component={Comments}
        />
        
      </Stack.Navigator>
    )
  }
}

export default HomeNavigation