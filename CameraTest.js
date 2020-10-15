'use strict';
import React, { PureComponent,useEffect } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import storage from '@react-native-firebase/storage';
import { TextInput } from 'react-native-paper';






class ExampleApp extends PureComponent {
  

  
  
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
        //   flashMode={RNCamera.Constants.FlashMode.on}
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
          <View><TextInput placeholder="Face Name"/>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Add Face List </Text>

          </TouchableOpacity>
          </View>
          <View>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Check similarity </Text>
            <Text style={{backgroundColor:'red',padding:5,alignSelf:'center'}} >True</Text>
          </TouchableOpacity>
          
          </View>

        </View>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      var dataSplit = data.uri.split('/')
      const filename = dataSplit[dataSplit.length-1]
      console.log(filename);
      const reference = await storage().ref().child('/lift/'+filename);
      await reference.putFile(data.uri)
      
      
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


