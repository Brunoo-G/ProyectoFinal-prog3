import { Text, View, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { Component } from 'react'
import firebase from 'firebase'
import { db, auth } from '../../firebase/config'
import Comment from '../../components/Comment/Comment'

class Comments extends Component {
  constructor(props){
    super(props)
    this.state={
      comentario: ''
    }
  }

  guardarComentario(){
    db.collection('posts')
    .doc(this.props.route.params.id) // falta snapshot
    .update({
      comentarios: firebase.firestore.FieldValue.arrayUnion({
        comentario: this.state.comentario,
        usuario: auth.currentUser.email
      })
    })
  }

  render() {
    console.log(this.props.route.params.id);
    return (
      <View style={styles.container}>
        <Text>Comentarios</Text>

        <FlatList 
        data = {this.props.route.params.comentarios}
        keyExtractor = {(item) => item.comentario}
        renderItem = {({item}) => <Comment data={item}/> }
        />

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