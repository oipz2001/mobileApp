import React, { Component } from 'react';
import { View,Image,Text,SafeAreaView,TouchableHighlight, Button } from 'react-native';
import WifiPresent from './src/screens/wifiPresent'
import Camera from './src/screens/cameraTest'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        showThings : true
        
    }
}

hideThings = () => {
  console.log("sss");
  this.setState({showThings : false })
}
 

  render () {
    
    return(
    // <WifiPresent />
    <Camera />
    // <SafeAreaView style={{flex: 1}}  >
      
    //   {this.state.showThings ?
    //   <TouchableHighlight style={{flex:1}} onPress={this.hideThings} >
    //   <Image source={{ uri: 'https://i.pinimg.com/736x/6f/24/8f/6f248fe1aa6b2fe28cd18f04f5d681c3.jpg'}} style={{flex: 1}} /> 
    //   </TouchableHighlight> : null }
    
     
    //  </SafeAreaView>
    
    
    );
    
    
  }
}
export default App

