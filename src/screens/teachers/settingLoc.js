import React,{useEffect, useState} from 'react'
import { Button, View,Text,StyleSheet,FlatList,StatusBar,TouchableOpacity,Image,PermissionsAndroid } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import wifi from 'react-native-android-wifi';
import MultiSelect from 'react-native-multiple-select';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

var items = [
  // this is the parent or 'item'
  {
    name: 'Fruits',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Apple',
        id: 10,
      },
      {
        name: 'Strawberry',
        id: 17,
      },
      {
        name: 'Pineapple',
        id: 13,
      },
      {
        name: 'Banana',
        id: 14,
      },
      {
        name: 'Watermelon',
        id: 15,
      },
      {
        name: 'Kiwi fruit',
        id: 16,
      },
    ],
  },
  {
    
  },

];

  

const SettingLoc = ({navigation}) => {
    const [wifiList,setWifiList] = useState([])
    const [selectedItems,setSelectedItems] = useState([])

    useEffect(() => {
        // askForUserPermissions();
        // getWifiList()
        // setInterval(() => {
        //    getWifiList()
        //  }, 30000);
        askForUserPermissions();
        getWifiList()
        const interval =  setInterval(() => {
          getWifiList()
        }, 2000);
        return () => clearInterval(interval);
        
         
        
       
          
       
        
        
        
    },[])

    const onSelectedItemsChange = (selectedItems) => {
        
        setSelectedItems(selectedItems) 
     };

    



    const getWifiList = () => {
        
        wifi.reScanAndLoadWifiList((wifiStringList) => {
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

        var wifiArray_modified = wifiArray
          for( var i=0;i<wifiArray.length;i++){
            if(wifiArray[i].level > -45){
              wifiArray[i].SSID = wifiArray[i].SSID.concat(' (Very Strong)')
            }
            else if(wifiArray[i].level > -60){
              wifiArray[i].SSID = wifiArray[i].SSID.concat(' (Strong)')
            }
            else if(wifiArray[i].level > -70){
              wifiArray[i].SSID = wifiArray[i].SSID.concat(' (Good)')
            }else{
              wifiArray[i].SSID = wifiArray[i].SSID.concat(' (Poor)')
            }
            
            wifiArray_modified[i] = { BSSID_dotConcat: wifiArray[i].BSSID.concat('.'+ i.toString())  ,  SSID:wifiArray[i].SSID  , level:wifiArray[i].level}
            console.log(wifiArray_modified[i]);
          }
            
          // setWifiList(wifiArray.sort((a, b) => parseInt(b.level) - parseInt(a.level)))
          setWifiList( wifiArray_modified.sort((a, b) => parseInt(b.level) - parseInt(a.level)))
            
          },(error)=>{
            console.log(error);
          });
       
    }

      const showWifiList = () => {
            getWifiList()
            console.log('Name: ' +wifiList[0].SSID + ' level: ' +wifiList[0].level );
            
            
        
    }

    const showSelectedWifi = () => {
      var selectedItems_result = []
      for(var i=0;i<selectedItems.length;i++){
           selectedItems_result.push(selectedItems[i].split(".")[0])
      }
      console.log(selectedItems_result);

      
      
  
}


     async function askForUserPermissions() {
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

    
    return(
        <>
        
        
        <View style={{backgroundColor:'white', margin:10,padding:10,borderRadius:20,elevation:7,paddingBottom:25}}>
        <Text style={{fontSize:20,backgroundColor:'#9E76B4',alignSelf:'center',padding:10,elevation:7,borderRadius:20,color:'white'}}>Set Location</Text>
        <SectionedMultiSelect
          items={wifiList}
          IconRenderer={Icon}
          uniqueKey="BSSID_dotConcat"
          selectText="Choose your local Wifi"
          showDropDowns={true}
          readOnlyHeadings={false}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          displayKey='SSID'
        />
        
      </View>
        
      
        {/* <Text style={{fontSize:20,backgroundColor:'#9E76B4',alignSelf:'center',padding:10,elevation:7,borderRadius:20,color:'white'}}>Create Session</Text> */}
        <TouchableOpacity onPress={() => navigation.navigate('TeacherHome')} style={{backgroundColor:'#9E76B4',alignSelf:'center',padding:10,elevation:7,borderRadius:20}}>
            <Text style={{fontSize:20,color:'white'}}>Create Session</Text>
        </TouchableOpacity>
        <View style={{padding:40}}>
          <Button title='Show Wifi List' onPress={showWifiList} />
          <Button title='Show selected wifi' onPress={showSelectedWifi}  />
          {/* <Text>SSID: {wifiList[0].SSID}  level:  {wifiList[0].level}</Text> */}
          <Text>{JSON.stringify(wifiList)}</Text>
          
        </View>
        </>
    )

}

export default SettingLoc
