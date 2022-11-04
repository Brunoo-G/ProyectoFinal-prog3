import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config'

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
        .then( resp => this.props.navigation.navigate('TabNavigation'))
        .catch( err => this.setState({error:err.message}))
    }

    render() {
        return (
        <View style={styles.container}>
            <View>
                <Text>Register</Text>
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
                        <Text>Registrar usuario</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text>Ya tienes una cuenta?</Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')}>
                        <Text>Logueate</Text>
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
        borderWidth:1
    }
})

export default Register