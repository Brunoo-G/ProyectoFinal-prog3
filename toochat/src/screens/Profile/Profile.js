import { Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'

class Profile extends Component {
  
  constructor(){
    super()
    this.state={
      misDatos: {},
      id:''
    }
  }

  componentDidMount(){
    db.collection('users')
    .where('email', '==', auth.currentUser.email)
    .onSnapshot(doc => {
      doc.forEach(doc => this.setState({
        id: doc.id,
        misDatos: doc.data()
      })) 
    })
  }

  cerrarSesion(){
    auth.signOut()
    .then( resp => this.props.navigation.navigate('Login'))
    .catch(err => console.log(err))
  } 



  render() {
    return (
      <View>
        <Text style={styles.text}>Email: {this.state.misDatos.email}</Text>
        <Text style={styles.text}>Usuario: {this.state.misDatos.usuario}</Text>
        <Text style={styles.text}>Biografia: {this.state.misDatos.biografia}</Text>
        <TouchableOpacity onPress={()=> this.cerrarSesion()}>
          <Text>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  text:{
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#0095F6',
  }
})


export default Profile