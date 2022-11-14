import { Text, View, TextInput, StyleSheet, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import React, { Component } from 'react'
import firebase from 'firebase'
import { db, auth } from '../../firebase/config'

class Comments extends Component {
  constructor(props){
    console.log(props);
    super(props)
    this.state={
      comentario: ''
    }
  }

  guardarComentario(){
    db.collection('posts')
    .doc(this.props.route.params.id)
    .update({
      comentarios: firebase.firestore.FieldValue.arrayUnion({
        comentario: this.state.comentario,
        usuario: auth.currentUser.email
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>comentarios</Text>

        <TextInput style={styles.input}
          keyboardType='default'
          placeholder='Agrega un comentario'
          onChangeText={text => this.setState({comentario: text})}
          value={this.state.comentario}
        />
        <TouchableOpacity onPress={()=> this.guardarComentario(this.state.descripcion)}>
          <Text>Publicar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    
    input:{
        height: 32,
        borderWidth: 1
    }
})

export default Comments