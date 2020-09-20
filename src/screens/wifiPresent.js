
import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  View,
  PermissionsAndroid,
  Button,
  FlatList
} from 'react-native';

import wifi from 'react-native-android-wifi';

import MultiSelect from 'react-native-multiple-select';

class WifiPresent extends Component {
  
  
  constructor(props){
        super(props);
        this.state = {
          isWifiNetworkEnabled: null, 
          wifiList: [],
          selectedWifi : [],
          showMatch : '',
          wifiArr:[],
          modalVisible: false
        };
    
      }

  
    

  onSelectedItemsChange = selectedWifi => {
    this.setState({ selectedWifi });
  };
  // pressButtonGetWifi = () =>{
  //   var wifi = this.state.wifiList.sort((a, b) => parseInt(b.level) - parseInt(a.level))
  //   var wifiName,level ,quality
  //   var result = [wifi.length]
  //   for(var i=0;i<wifi.length;i++){
  //     // wifiMac=wifi[i].BSSID
  //     wifiName=wifi[i].SSID
  //     level=wifi[i].level
  //     console.log(level);
  //     if(level>=-40){
  //       quality='Excellent'
  //     }else if(level>=-60){
  //       quality='Very Strong'
  //     }else if(level>=-67){
  //       quality='Good'
  //     }else if(level>=-72){
  //       quality='Reliable'
  //     }else if(level>=-90){
  //       quality='Weak'
  //     }
  //     result[i]=' '+wifiName+'  '+quality
      
      
  //   }
  //   this.setState({wifiArr:result})
    






    

  // }

  regisMac(){ //ส่ง request  wifi ไป register
    
    fetch('https://us-central1-studentchecking.cloudfunctions.net/checkapp/regismac', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    
        body: JSON.stringify(this.state.selectedWifi)
    })


  }
  UnregisMac(){//ส่ง request  wifi ไปลบ  register
    
    fetch('https://us-central1-studentchecking.cloudfunctions.net/checkapp/removemac', {
      method: 'delete'
      
    }).then(res => res.json())
    


  }

  checkMatch(){ //ส่ง request  wifi ของ client ไป เช็ค match กับ database
    this.getWifiList()
    fetch('https://us-central1-studentchecking.cloudfunctions.net/checkapp/matchmac', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    
        body: JSON.stringify(this.state.wifiList)
    }).then(res => res.json())
    .then(data => {
      if(data == true){
      this.setState({showMatch:'You Are Here'})
      }else{
        this.setState({showMatch:'You Are Not Here'})
      }
    
    })
  }

  getWifiList = () => {
    wifi.loadWifiList((wifiStringList) => {
      var wifiArray = JSON.parse(wifiStringList);
      var keycap = 'capabilities'
      var keyfre = 'frequency'
      var keytime = 'timestamp'
      for(var i=0;i<wifiArray.length;i++)
      {
        delete wifiArray[i][keycap]
        delete wifiArray[i][keyfre]
        delete wifiArray[i][keytime]
      }
      
      console.log(wifiArray);
      this.setState({
        wifiList: wifiArray.sort((a, b) => parseInt(b.level) - parseInt(a.level))
        
      });
      
      
    },
    (error) => {
      console.log(error);
    }
  )
  }

  componentDidMount(){
    
    this.getWifiList()
    this.askForUserPermissions();
  
  }
  

  async askForUserPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Wifi networks',
          'message': 'We need your permission in order to find wifi networks'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Thank you for your permission! :)");
      } else {
        console.log("You will not able to retrieve wifi available networks list");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  
  
  
  
  

  

  

  render () {
    const { selectedWifi } = this.state;
    
    return (
      // <View>
        <View style={{flex:1,backgroundColor:"red",margin:0,padding:0,justifyContent:'space-evenly'}}>
        {/* <Button title="Get Wifi" onPress={this.pressButtonGetWifi}/> */}
        
        
        <View style={{margin:10}} >
        <MultiSelect
          hideTags
          items={this.state.wifiList}
          uniqueKey="BSSID"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedWifi}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={ (text)=> console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="SSID"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
          hideSubmitButton={true}
          fixedHeight={true}
          
        />
        </View>
       
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
          
          
          <Button title='Regis Wifi' onPress={this.regisMac.bind(this)} />
        
        
        
        <Button title='UnRegis Wifi' onPress={this.UnregisMac.bind(this)} />
        
        </View>
        <View >
        <Button title='Check matcing wifi' onPress={this.checkMatch.bind(this)}/>
        </View>

        <View style={{alignSelf:'center'}}>
      <Text>{this.state.showMatch}</Text>
        </View>
        
        
     
         
          
          
          
          
      
          
       </View>
    )
  }
}
export default WifiPresent

