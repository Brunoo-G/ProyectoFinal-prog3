import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import Camera from '../../components/Camera/Camera'

class NewPosts extends Component {
  
    constructor(){
        super()
        this.state={
            descripcion: '',
            mostrarCamara: true,
            fotoUrl: ''
        }
    }

    guardarPost(text){
        db.collection('posts').add({
            usuario: auth.currentUser.email,
            createdAt: Date.now(),
            descripcion: text,
            likes: [],
            comentarios: [],
            foto: this.state.fotoUrl
        })

    }

    subirFoto(url){
        this.setState({
            fotoUrl: url,
            mostrarCamara: false
        })
    }
  
    render() {
        return (
        <View style={styles.container}>
            {
                this.state.mostrarCamara ?
                <Camera subirFoto={(url)=> this.subirFoto(url)}/> :
                <>
                    <TextInput
                    placeholder='Descripción'
                    onChangeText={text => this.setState({descripcion: text})}
                    value={this.state.descripcion}
                    keyboardType='default'
                    style={styles.input}
                    />
                    <TouchableOpacity onPress={()=> this.guardarPost(this.state.descripcion)}>
                        <Text>Compartir</Text>
                    </TouchableOpacity>
                </>
            }
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

export default NewPosts