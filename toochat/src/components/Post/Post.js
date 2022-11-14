import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import firebase from 'firebase'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            like: false,
            cantidadLikes: props.data.likes.length,
            cantidadComentarios: props.data.comentarios.length
        }
    }

    componentDidMount(){

    }

    like(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(resp => {
            this.setState({
                like: true,
                cantidadLikes: this.state.cantidadLikes + 1
            })
        })
        .catch(err => console.log(err))
    }

    unlike(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(resp =>  {
            this.setState({
                like: false,
                cantidadLikes: this.state.cantidadLikes - 1
            })
        })
        .catch(err => console.log(err))
    }



  render() {
    return (
      <View style={styles.container}>

        <View style={styles.profile}>
            <Image style={styles.imageProfile}
                source={{uri: 'https://www.americatv.com.pe/cinescape/wp-content/uploads/2018/02/225981.jpg'}} // falta que llamar a la foto de perfil de cada usuario
                resizeMode = 'cover'
            />  
            <Text style={styles.textProfile}>{this.props.data.usuario}</Text>
        </View>

        <Image style={styles.image}
            source={{uri: `${this.props.data.foto}`}}
            resizeMode = 'cover'
        />  
        
        <View style={styles.botones}>
        {
            this.state.like ?
                <TouchableOpacity onPress={()=> this.unlike()}>
                    <FontAwesome name='heart' color='#0095F6' size={30} />
                </TouchableOpacity>
            :
                <TouchableOpacity onPress={()=> this.like()}>
                    <FontAwesome name='heart-o' color='black' size={30} />
                </TouchableOpacity>
        }

        <TouchableOpacity style={{marginLeft: 8}}> 
            <Ionicons name="ios-chatbubble-outline"  color="black" size={30} />
        </TouchableOpacity>
        </View>

        <Text style={styles.text}>{this.state.cantidadLikes} Me gusta</Text>
        <Text style={styles.descripcion}>{this.props.data.descripcion}</Text> 

        {
            this.state.cantidadComentarios === 0 ? <Text>Aún no hay comentarios</Text>
            :
            <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeNavigation', { //Preguntar
                screen: 'Comments',
                params: {
                    comentarios: this.props.data.comentarios
                }
            })}>
                <Text style={styles.text}>Ver los {this.state.cantidadComentarios} comentarios </Text> 
            </TouchableOpacity> 
        }

        <Text>{this.props.data.comentarios}</Text>
        
      </View>
    )
  }
} 

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        marginBottom: 10, 
        padding: 12,
        paddingTop: 0,
        borderTopWidth: 1,
        borderRadius: 10,
        borderColor: '#B5B5B5'
    },

    text:{
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 15
    },

    descripcion:{
        marginLeft: 5,
        fontSize: 16
    },

    image:{
        height: 270,
        marginBottom: 5,
        alignItems: 'center',
        borderRadius: 10
    },

    botones:{
        marginLeft: 10, 
        flexDirection: 'row',
    },

    profile:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
    },

    imageProfile:{
        height: 43,
        width: 43,
        borderRadius: 1000
    },

    textProfile:{
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 2.5,
        fontSize: 16,
    },


})

export default Post