import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { storage } from '../../firebase/config'

class Camara extends Component {
    constructor(){
        super()
        this.metodosCamara = null
        this.state = {
            mostrarCamara: false,
            fotoUri: ''
        }
    }

    // Permisos
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=> this.setState({
            mostrarCamara: true
        }))
        .catch(err => console.log(err))
    }

    tomarFoto(){
        this.metodosCamara.takePictureAsync()
        .then( img => this.setState({  // guardo la img almacenada como un espacio en memoria temporal
            fotoUri: img.uri, 
            mostrarCamara: false
        }))
        .catch(err => console.log(err))
        
    }

    aceptar(url){
        fetch(url)
        .then(img => img.blob()) // parceo la imagen en binario
        .then(imagenOk =>{
            const ref = storage.ref(`fotos/${Date.now()}.jpg`) // guardo la imagen en el storage de firebase
            ref.put(imagenOk)
            .then(()=>{
                ref.getDownloadURL() // trae la ruta real con la que esta guardada la imagen en firebase
                .then((url)=>{
                    this.props.subirFoto(url)
                })
            })
        })
        .catch(err => console.log(err))
    }

    rechazar(){
        this.setState ({
            mostrarCamara: true,
            fotoUri: ''
        })
    }

  render() {
    return (
      <View style={styles.container}>
        
        {
            this.state.mostrarCamara ? 
            <>
                <Camera
                    style={styles.camara}
                    type={Camera.Constants.Type.back}
                    ref={metodosDelComponente => this.metodosCamara = metodosDelComponente}
                />
                <TouchableOpacity onPress={()=> this.tomarFoto()}>
                    <Text>Tomar foto</Text>
                </TouchableOpacity>
            </> 

            : this.state.mostrarCamara === false && this.state.fotoUri !== '' ?

            <>
                <Image
                    style={styles.image}
                    source={{uri: this.state.fotoUri}}
                />

                <TouchableOpacity onPress={()=> this.aceptar(this.state.fotoUri)}>
                    <Text>Aceptar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> this.rechazar()}>
                    <Text>Rechazar</Text>
                </TouchableOpacity>
            </> : 
            
            <Text>No tienes permiso para usar la Camara</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },

    camara:{
        height: 200
    },

    image:{
        height: 500
    }
})

export default Camara