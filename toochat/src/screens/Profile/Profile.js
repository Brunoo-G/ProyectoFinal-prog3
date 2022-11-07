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
      <>
      <View style={styles.cage}>
        <Text style={styles.foto}>Aca va a ir la foto</Text>
        <Text style={styles.text}>Email: {this.state.misDatos.email}</Text>
        <Text style={styles.text}>Usuario: {this.state.misDatos.usuario}</Text>
        <Text style={styles.text}>Biografia: {this.state.misDatos.biografia}</Text>
      </View>
      <View>
      <TouchableOpacity onPress={()=> this.cerrarSesion()}>
          <Text style={styles.botton}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
      </>
    )
  } 
}

const styles = StyleSheet.create({
  foto:{
    flex: 4, 
    backgroundColor: 'green'
  },
  text:{
    flex: 2,
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#0095F6',
  },
  botton:{
    textAlign: 'center',
    backgroundColor: '#0095F6',
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
    fontWeight: 'bold',
    color:'#FFFFFF'
  },
  cage:{
    backgroundColor: 'black',
  }
})


export default Profile