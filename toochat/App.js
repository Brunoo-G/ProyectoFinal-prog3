import MainNavigation from './src/navigation/MainNavigation';
import { Component } from 'react';

export default class App extends Component {
  
  constructor(){
    super()
    this.state = {
      initialScreen:'Login'
    }
  }
  
  render(){
    return (
        <MainNavigation initial={this.state.initialScreen} />
    );
  }
}