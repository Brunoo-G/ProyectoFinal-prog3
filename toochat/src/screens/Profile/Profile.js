import { Text, View, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'

class Profile extends Component {
  
  constructor(){
    super()
    this.state={
      
    }
  }

  cerrarSesion(){
    auth.signOut()
  } 

  render() {
    return (
      <View>
        <Text>Profile</Text>

        <TouchableOpacity>
          <Text>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Profile