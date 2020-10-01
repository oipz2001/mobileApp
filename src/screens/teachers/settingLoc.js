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
        askForUserPermissions();
        getWifiList()
        getWifiList()
        getWifiList()
        
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
          console.log(wifiArray);
            
            setWifiList(wifiArray.sort((a, b) => parseInt(b.level) - parseInt(a.level)))
            
          },(error)=>{
            console.log(error);
          });
       
    }

    const showWifiList = () => {
            getWifiList()
            console.log(wifiList);
            
            
        
    }

    const showSelectedWifi = () => {
      console.log(selectedItems);
      
      
  
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
        {/* <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('TeacherHome')} style={{backgroundColor:'red',padding:20}}>
            <Text>Create Session</Text>
        </TouchableOpacity>
        <Button title='Get Wifi List' onPress={getWifiList} /> */}
        <Button title='Show Wifi List' onPress={showWifiList} />
        <Button title='Show selected wifi' onPress={showSelectedWifi} />
        <View>
        <SectionedMultiSelect
          items={items}
          IconRenderer={Icon}
          uniqueKey="id"
          subKey="children"
          selectText="Choose some things..."
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
        />
      </View>
        
        </>
    )

}

export default SettingLoc
