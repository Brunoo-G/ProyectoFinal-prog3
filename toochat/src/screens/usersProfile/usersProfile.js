import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Post from '../../components/Post/Post'

class usersProfile extends Component {

    constructor(){
        super()
        this.state={
          misDatos: {},
          id:'',
          posteos: [],
        }
    }

    componentDidMount(){
        db.collection('users')
        .where('email', '==', this.props.route.params.email)
        .onSnapshot(doc => {
          doc.forEach(doc => this.setState({
            id: doc.id,
            misDatos: doc.data()
          })) 
        })
        db.collection('posts')
        .where('usuario', '==', this.props.route.params.email)
        .onSnapshot(docs => {
          let posts = []
          docs.forEach(doc => {
              posts.push({
                  id: doc.id,
                  data: doc.data()
              })
          })
          this.setState({
              posteos: posts
          })
      })
    }


  render() {
    return (
        <>
        <View style={styles.container}>
          <Text style={styles.text}>{this.state.misDatos.email}</Text>
          <View style={styles.card}>
            <Image style={styles.image}
              source={{uri: 'https://www.americatv.com.pe/cinescape/wp-content/uploads/2018/02/225981.jpg'}} // falta que llamar a la foto de perfil de cada usuario
              resizeMode = 'cover'
            />
            <Text style={styles.textCard}>{this.state.misDatos.usuario}</Text>
          </View>      
          <Text style={styles.text}>Biografia: {this.state.misDatos.biografia}</Text>   
          <Text>Cantidad de posts: {this.state.posteos.length}</Text>
        </View>
  
        <View style={styles.container}>
          <Text>Posteos</Text>
          {this.state.posteos.length >= 1 ? 
          <FlatList 
          data = {this.state.posteos}
          keyExtractor = {(item) => item.id.toString()}
          renderItem = {(item) => <Post data={item.item.data} id={item.item.id} />} // preguntar xq item.item (2 veces)
          />
          :
          <Text>Aun no hay publicaciones</Text>
          }
        </View>
        </>
      )
    } 
}

const styles = StyleSheet.create({

    container:{
      flex: 1, 
      justifyContent: 'center',
      paddingHorizontal: 32
    },
  
    text:{
      textAlign: 'center',
      fontSize: 24,
    },
  
    image:{
      height: 130,
      width: 130,
      borderRadius: 1000,
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    card:{
      flexDirection: 'row',
      alignItems: 'center',
    },
  
    textCard:{
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      marginLeft: 20
    }
  
  
  })
  

export default usersProfile;