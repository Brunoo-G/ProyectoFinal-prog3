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
        <Text>Login</Text>
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
                    <Text>Loguearme</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text>Aun no tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register') }>
                    <Text>Registrate</Text>
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
    input:{
        borderWidth:1
    }
})

export default Login