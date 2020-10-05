
'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

class QR_Scan extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            shouldBarcodeDetect : true,
            receivedBarcodeData : ''
            
        }
    }

    componentDidMount(){
      console.log(this.props.route.params.sessionID + ' ' +this.props.route.params.sessionTitle + '(Scan QR)');
    }
  render() {

    return (
      <View style={styles.container}>
        <View>
        <TouchableOpacity style={styles.capture}>
            <Text style={{ fontSize: 14 }}>Data: {this.state.receivedBarcodeData} </Text>
        </TouchableOpacity>
         
        </View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          
        //   onGoogleVisionBarcodesDetected={({ barcodes }) => {
        //     console.log(barcodes[0].data);
        //   }}
        onGoogleVisionBarcodesDetected={this.state.shouldBarcodeDetect ? this.handleBarcodeDetected : null}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        />
        
        
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          {/* <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={this.setDetectBarcode.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}>Barcode Detect Enable</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.showBarcodeData.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Show Data </Text>
            
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  handleBarcodeDetected = ({barcodes}) => {
      console.log(barcodes[0].type + ' ' + barcodes[0].data);
      if( barcodes[0].type  == 'QR_CODE'){
      this.setState({receivedBarcodeData:barcodes[0].data})
      this.setState({shouldBarcodeDetect:false})
    }

  }

  setDetectBarcode = () => {
    this.setState({shouldBarcodeDetect:true})
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    
    }
  };

  showBarcodeData = () => {
    console.log(this.state.receivedBarcodeData);
    
    // this.props.navigation.navigate('StudentHome')

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

export default QR_Scan