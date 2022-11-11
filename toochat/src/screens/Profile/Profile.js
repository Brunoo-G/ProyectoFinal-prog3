import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
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
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.misDatos.email}</Text>

        <View style={styles.card}>
          <Image style={styles.image}
            source={{uri: 'https://www.americatv.com.pe/cinescape/wp-content/uploads/2018/02/225981.jpg'}} // falta que llamar a la foto de perfil de cada usuario
            resizeMode = 'cover'
          />
          <Text style={styles.textCard}>{this.state.misDatos.usuario}</Text>
        </View>
              
        <Text style={styles.text}>Biografia: {this.state.misDatos.biografia}</Text>
        
        <TouchableOpacity onPress={()=> this.cerrarSesion()}>
          <Text style={styles.botton}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
      
      </>
    )
  } 
}

const styles = StyleSheet.create({

  container:{
    flex: 1, 
    justifyContent: 'center',
    paddingHorizontal: 32
  },

  text:{
    textAlign: 'center',
    fontSize: 24,
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

  image:{
    height: 130,
    width: 130,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center'
  },

  card:{
    flexDirection: 'row',
    alignItems: 'center',
  },

  textCard:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 20
  }


})


export default Profile