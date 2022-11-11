import { Text, View, TextInput , TouchableOpacity, FlatList} from 'react-native'
import React, { Component } from 'react'
import { db } from '../../firebase/config'

class Search extends Component {
    constructor(props){
        super(props)
        this.state={
            data: [],
            id:'', 
            resultados: [],
            users: [], 
        }
    }

    componentDidMount(){
        db.collection('users')
        .onSnapshot(doc => {
          let resultados = [];
          doc.forEach(doc => {
            resultados.push({
                id: doc.id, 
                data: doc.data()
            })
            
          })
          this.setState(
            {data: resultados}
          )
          console.log(resultados)
        })
    }

    buscar(text){
        let usersFilter = this.state.users.filter(elm =>
            elm.usuario.toUpperCase().includes(text.toUpperCase()
        ))
        this.setState({
            users: usersFilter
        })
    }

  render() {
    return( 
        <View>
            <Text>Search</Text>
            <TextInput
            placeholder='A quien estas buscando?'
            onChangeText={text => this.buscar(text)}
            value={this.state.usuario}
            />
            <FlatList
               data = {this.state.data}
               keyExtractor = {item => item.id.toString()}
               renderItem = {({item}) => <Text>{item.usuario}</Text>}
            />
        </View>
    )
  }
}

export default Search;