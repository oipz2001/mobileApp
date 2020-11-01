import React,{useEffect, useState} from 'react'
import { Button, View,Text,StyleSheet,FlatList,StatusBar,TouchableOpacity,Image,PermissionsAndroid } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import wifi from 'react-native-android-wifi';
import MultiSelect from 'react-native-multiple-select';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import CheckBox from '@react-native-community/checkbox'

  

const SettingLoc = ({navigation}) => {
    const [wifiList,setWifiList] = useState([])
    const [selectedItems,setSelectedItems] = useState([])
    const [isAutoSelected, setAutoSelection] = useState(true);
    const [isCustomSelected, setCustomSelection] = useState(false);

    useEffect(() => {
        askForUserPermissions();
        getWifiList()
        // const interval =  setInterval(() => {
        //   getWifiList()
        // }, 60000);
        // return () => clearInterval(interval);

        
         
        
       
          
       
        
        
        
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
              wifiArray[i].SSID = wifiArray[i].SSID.concat(' (แรงมาก) ' + wifiArray[i].level + ' dBm')
            }
            else if(wifiArray[i].level > -60){
              wifiArray[i].SSID = wifiArray[i].SSID.concat(' (แรง) '+ wifiArray[i].level+ ' dBm')
            }
            else if(wifiArray[i].level > -70){
              wifiArray[i].SSID = wifiArray[i].SSID.concat(' (ดี) '+ wifiArray[i].level+ ' dBm')
            }else{
              wifiArray[i].SSID = wifiArray[i].SSID.concat(' (อ่อน) '+ wifiArray[i].level+ ' dBm')
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
        
        
        <View style={{backgroundColor:'white', margin:10,padding:10,borderRadius:20,elevation:7,paddingBottom:25,flex:1,alignItems:'center',justifyContent:'space-between'}}>
        <Text style={{fontSize:20,backgroundColor:'#9E76B4',alignSelf:'center',padding:10,elevation:7,borderRadius:20,color:'white'}}>Set Location</Text>
        <Text>กรุณาอยู่ในบริเวณที่ต้องการทำการสร้างห้องเรียนเช็คชื่อ และเลือกสัญญาณ Wi-Fi โดยจะให้ระบบเลือกอัตโนมัติ หรือเลือกด้วยตนเอง ควรเลือกจากความแรงของสัญญาณที่มากที่สุด เพื่อจำกัดขอบเขตให้อยู่ในบริเวณมากที่สุด</Text>
        <View style={{flexDirection:'row'}}>
        </View>
        { !isAutoSelected &&
        <View style={{backgroundColor:'#9E76B4',width:350,borderRadius:25,elevation:8,padding:15}}>
        <SectionedMultiSelect
          items={wifiList}
          IconRenderer={Icon}
          uniqueKey="BSSID_dotConcat"
          selectText="เลือกด้วยตนเอง"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          displayKey='SSID'
          // expandDropDowns={true}
          colors={{selectToggleTextColor:'#ffffff',chipColor:'#ffffff'}}
        />
        </View>
        
        }
        <View style={{flexDirection:'row'}}>
            <CheckBox value={isAutoSelected} onValueChange={setAutoSelection}/>
            <Text>เลือกอัตโนมัติ</Text>
          </View> 
        <TouchableOpacity onPress={() => navigation.navigate('TeacherHome')} style={{backgroundColor:'#9E76B4',padding:10,elevation:7,borderRadius:20}}>
            <Text style={{fontSize:20,color:'white'}}>Create Session</Text>
        </TouchableOpacity>
      </View>
      {/* <Button title='test' onPress={showSelectedWifi}/> */}
        
      
       
        </>
    )

}

export default SettingLoc
