
'use strict';
import React, { PureComponent } from 'react';
import {  StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Buffer } from 'buffer'
import AsyncStorage from '@react-native-community/async-storage'
const key = '8b4bdfc570514b1d9e71628238368e3e'


class CameraAddFaceList extends PureComponent {

  

    constructor(props) {
        super(props);
        this.state = {
            studentIDState:'',
            isFaceListAdded:false
            
        }
    }

    

    _retrieveUserData = async () => {
        const  studentID = await AsyncStorage.getItem('uniqueIDStudent');
        // const  studentID = '600610888'
        this.setState({studentIDState:studentID})
  
    }

    componentDidMount(){
        this._retrieveUserData()
    }

   


    
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity  style={styles.capture}>
            <Text style={{ fontSize: 14 }}> ถ่ายภาพใบหน้าเพื่อบันทึกลงในฐานข้อมูล</Text>
          </TouchableOpacity>
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
          
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.capture}>
            <Text style={{ fontSize: 14 }}> {this.state.isFaceListAdded.toString()} </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

 

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      var base64String = data.base64; 
      var bufferValue = Buffer.from(base64String,"base64");
      var faceListId = this.state.studentIDState
      await this.CreateFaceList(faceListId,faceListId+'_Face')
      await this.AddToFaceList(faceListId,bufferValue)
      
    
    }
  };

 



   CreateFaceList = async (faceListId,faceName) => { //Create empty face list id
        
        await fetch('https://southeastasia.api.cognitive.microsoft.com/face/v1.0/facelists/'+faceListId, {
            method: 'PUT',
            headers: {
            'Content-type': 'application/json',
            'Ocp-Apim-Subscription-Key': key
            
            },
            body:  JSON.stringify({name:faceName})
            
            
        })
        .then(res => res.text())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });


        
    }

    AddToFaceList = async (faceListId,binaryData) => { // Add URL image to specific face list id
        
        await fetch('https://southeastasia.api.cognitive.microsoft.com/face/v1.0/facelists/'+faceListId+'/persistedFaces', {
            method: 'POST',
            headers: {
            'Ocp-Apim-Subscription-Key': key,
            'Content-Type':'application/octet-stream'
            },
            body: binaryData
            
            
        })
        .then(res => res.json())
        .then(data => {
            this.setState({isFaceListAdded:true})
            console.log(data);
            
            this.props.navigation.goBack()
            this.props.navigation.navigate('StudentHome')
            
        })
        .catch((error) => {
            console.log(error);
        });
    }

    ListFaceList = async () => { //Get whole face list 
        
        await fetch('https://southeastasia.api.cognitive.microsoft.com/face/v1.0/facelists', {
            method: 'GET',
            headers: {'Ocp-Apim-Subscription-Key': key}
            
            
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    





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

export default CameraAddFaceList