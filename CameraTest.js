'use strict';
import React, { PureComponent,useEffect } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View,TextInput } from 'react-native';
import { RNCamera } from 'react-native-camera';
import storage from '@react-native-firebase/storage';
import { Buffer } from 'buffer'

const key = '8b4bdfc570514b1d9e71628238368e3e'


class ExampleApp extends PureComponent {


  state = {
      faceName : '',
      matchFaceName : ''

  }


  _onChangeTextFaceName(text){
    this.setState({faceName:text})
    console.log(text);
  }

  _onChangeTextmatchFaceName(text){
    this.setState({matchFaceName:text})
    console.log(text);
  }

  _checkMatchFace = async (bufferValue) => {
     await fetch('http://localhost:5000/studentchecking/us-central1/checkapp/mobileApp/matchFaceResult', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstParam: bufferValue
        })
      });
  }
  

  
  
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          // onGoogleVisionBarcodesDetected={({ barcodes }) => {
          //   console.log(barcodes);
          // }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <View>
          <TouchableOpacity onPress={this.takePictureAdd.bind(this)} style={styles.capture}>
          <TextInput placeholder="Add Face name" onChangeText={text => this._onChangeTextFaceName(text)} />
            <Text style={{ fontSize: 14 }}> Add Face List </Text>

          </TouchableOpacity>
          </View>
          <View>
          <TouchableOpacity onPress={this.takePictureMatch.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Check similarity </Text>
            <TextInput placeholder="Face Name for match" onChangeText={text => this._onChangeTextmatchFaceName(text)}/>
            <Text style={{backgroundColor:'red',padding:5,alignSelf:'center'}} >True</Text>
          </TouchableOpacity>
          
          </View>

        </View>
      </View>
    );
  }

  takePictureAdd = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      const reference = await storage().ref().child(this.state.faceName+'|add');
      await reference.putFile(data.uri)
      
      
    }
  };

  takePictureMatch = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      var base64String = await data.base64; // your base64 string
      var bufferValue = await Buffer.from(base64String,"base64");
      console.log(bufferValue);
      console.log(data.uri);

      // await fetch('https://us-central1-studentchecking.cloudfunctions.net/checkapp/mobileApp/matchFaceResult', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     firstParam: bufferValue
      //   })
        
      //   // body: {firstParam: bufferValue}
        
      // })
      // .then(res => res.json())
      // .then(data => {
      //   console.log(data);
      
      // })
      
      await fetch('https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect', {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Content-Type':'application/octet-stream'
        },
        body: JSON.stringify({
          bufferValue
        })
        
        
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      
      })
      
      // const reference = await storage().ref().child(this.state.matchFaceName+'|match');
      // await reference.putFile(data.uri)

      
      
    }
  };
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default ExampleApp


