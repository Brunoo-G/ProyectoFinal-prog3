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
            cantidadLikes: props.data.likes.length 
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

        <View>
            <Text style={styles.text}>{this.props.data.usuario}</Text>
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

        <View style={styles.cardDescripcion}>
            <Text style={styles.text}>{this.props.data.usuario}:</Text>
            <Text style={styles.descripcion}>{this.props.data.descripcion}</Text>  
        </View>
      
      
      </View>
    )
  }
} 

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        marginTop: 30
    },

    text:{
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 20
    },

    descripcion:{
        marginLeft: 5,
        fontSize: 20
    },

    cardDescripcion:{
        flexDirection: 'row'
    },

    image:{
        height: 270,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center'
    },

    botones:{
        marginLeft: 10, 
        flexDirection: 'row',
    }

})

export default Post