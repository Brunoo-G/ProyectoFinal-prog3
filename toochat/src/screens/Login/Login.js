import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React, { Component } from 'react'
import {auth} from '../../firebase/config'


class Login extends Component {

    constructor(props){
        super(props)
        this.state={
            email:'',
            clave:'',
            logueado: false
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user !== null){
                this.props.navigation.navigate('TabNavigation')
            }
        })
    }

    loguear(email, clave){
        auth.signInWithEmailAndPassword(email, clave)
        .then( resp => this.props.navigation.navigate('TabNavigation'))
        .catch(err => console.log(err))
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <View>
            <TextInput
             style={ styles.input}
             onChangeText={ text => this.setState( {email:text} )}
             placeholder='Ingresa tu email'
             value={this.state.email}
            />
            <TextInput
             style={ styles.input}
             onChangeText={ text => this.setState( {clave:text} )}
             placeholder='Ingresa tu clave'
             value={this.state.clave}
            />
            <View>
                <TouchableOpacity onPress={()=> this.loguear(this.state.email, this.state.clave)}>
                    <Text style={styles.botton}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text>¿Aún no tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register') }>
                    <Text style={styles.register}>Registrate</Text>
                </TouchableOpacity>
            </View>
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
    
    title:{
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 15,
        fontWeight: 'bold',
        color: '#0095F6',
    },
    
    input:{
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        borderRadius: 5,
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
        color:'#FFFFFF',
    },

    register:{
        color: '#0095F6',
        fontWeight: 'bold'
    }
})

export default Login