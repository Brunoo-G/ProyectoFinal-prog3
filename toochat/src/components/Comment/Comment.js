import { Text, View } from 'react-native'
import React, { Component } from 'react'

class Comment extends Component {
    constructor(props){
        super(props)
        this.state={
            comentario: props.data.comentario,
            usuario: props.data.usuario
        }
    }
    
  render() {
    return (
      <View>
        <Text>{this.state.usuario}:</Text>
        <Text>{this.state.comentario}</Text>
      </View>
    )
  }
}

export default Comment