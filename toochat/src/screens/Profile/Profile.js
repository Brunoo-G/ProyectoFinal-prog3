import { Text, View, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import {auth} from '../../firebase/config'

class Profile extends Component {
  
  constructor(){
    super()
    this.state={
      
    }
  }

  cerrarSesion(){
    auth.signOut()
    .then( resp => this.props.navigation.navigate('Login'))
    .catch(err => console.log(err))
  } 

  render() {
    return (
      <View>
        <Text>Profile</Text>

        <TouchableOpacity onPress={()=> this.cerrarSesion()}>
          <Text>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Profile