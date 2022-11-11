import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button, Image, Platform } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { db,  auth } from '../../firebase/config'

class Register extends Component {

    constructor(){
        super()
        this.state={
            email:'',
            clave:'',
            usuario:'',
            biografia:'',
            error:''
        }
    }

    registrar(email, clave){
        auth.createUserWithEmailAndPassword(email, clave)
        .then(resp => {
            db.collection('users').add({
                email: auth.currentUser.email,
                usuario: this.state.usuario,
                createdAt: Date.now(), 
                clave: this.state.clave,
                biografia: this.state.biografia
            })
        })
        .then( resp => this.props.navigation.navigate('TabNavigation'))
        .catch( err => this.setState({error:err.message}))
    }

    render() {
        return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Completa el formulario</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Escribi tu email'
                    onChangeText={text => this.setState({email: text})}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Escribi tu contraseña'
                    onChangeText={text => this.setState({clave: text})}
                    value={this.state.clave}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Nombre de usuario'
                    onChangeText={text => this.setState({usuario: text})}
                    value={this.state.usuario}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Biografía'
                    onChangeText={text => this.setState({biografia: text})}
                    value={this.state.biografia}
                />
                <View>
                    <TouchableOpacity onPress={()=> this.registrar(this.state.email, this.state.clave)}>
                        <Text style={styles.botton}>Registrarme</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text>¿Ya tienes una cuenta?</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
                        <Text style={styles.loguin}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.error !== '' ?
                    <Text>{this.state.error}</Text>:
                    ''
                }
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:32
    },

    input:{
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        borderRadius: 5,
    },

    title:{
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

    loguin:{
        color: '#0095F6',
        fontWeight: 'bold'
    }
})

export default Register