import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db } from '../../firebase/config'

class Comments extends Component {
  constructor(props){
    super()
    this.state={
      comentarios: ''
    }
  }

  componentDidMount(){

  }

  guardarComentario(text){
    db.collection('posts')
    .doc(this.prop.id)
    .update({
      comentarios: []
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>comentarios</Text>

        <TextInput style={styles.input}
          keyboardType='default'
          placeholder='Agrega un comentario'
          onChange={text => this.setState({comentario: text})}
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