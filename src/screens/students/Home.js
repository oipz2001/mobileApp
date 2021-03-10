import React,{useState,useEffect,useRef} from 'react'
import { Button, View,Text,StyleSheet,StatusBar,FlatList,TouchableOpacity,PermissionsAndroid,Modal,ActivityIndicator  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Calendar from '../../components/CalendarPicker'
import {useFocusEffect} from '@react-navigation/native';
import wifi from 'react-native-android-wifi';
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarPicker from 'react-native-calendar-picker';

const URL = require('../../config/endpointConfig')

const myEndpointURL =  URL.myEndpointStudent

const moment = require('moment')


const StudentHome = ({navigation,route}) => {

  const [selectedDate,setSelectedDate] = useState(moment(new Date()).format('YYYY-MM-DD').toString())
  // const [currentDate,setcurrentDate] = useState(moment(new Date()).format('YYYY-MM-DD').toString())
  //   const [currentTime,setcurrentTime] = useState(moment(new Date()).format('HH:mm').toString())
    const [wifiList,setWifiList] = useState([])
    const [sessionsData,setSessionsData] = useState([])


    const [localTime,setLocalTime] = useState(moment(new Date()).format('HH:mm').toString())

    const [studentIDState,setStudentIDState] = useState(null)

    const [isWifiMatchModalShow,setIsWifiMatchModalShow] = useState(false)

    const [isMatchFalseModalShow,setIsMatchFalseModalShow] = useState(false)



    const _retrieveUserData = async () => {
      // const  studentID = await AsyncStorage.getItem('uniqueIDStudent');
      const  studentID = await AsyncStorage.getItem('name');
      setStudentIDState(studentID)

    }

    useEffect(() => {
      _retrieveUserData()
    },[])

    // useEffect(() => {
    //   const interval =  setInterval(async () => {
    //      await getWifiList()
    //     //  console.log(wifiList);
    //     // setCount(count+1)
    //     // console.log(count);
        
    //     }, 10000);
    //     return () => clearInterval(interval);
    // },[wifiListStr])

    useEffect(() =>{
      const interval =  setInterval(async () => {
        setLocalTime(moment(new Date()).format('HH:mm').toString())
            
      }, 1000);


    

      

      const funcFetchSession = async () => {
      var localTime = moment(new Date()).format('HH:mm').toString()
       var localDate = moment(new Date()).format('YYYY-MM-DD').toString()
        await _fetchSessionsAPI(selectedDate,localTime,localDate)
      };

      if(studentIDState!=null)
        funcFetchSession()
        
  
      return () => clearInterval(interval);
    },[localTime])

    
    const matchWifiAPI = async (wifis,uqID,teacherID,studentID) => {
      await fetch(myEndpointURL+'/matchMAC', {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            studentWifiList:wifis,
            classData:{uqID:uqID,teacherID:teacherID}
        })
        })
        .then((response) => response.json())
        .then(async (data) => {
            
            console.log(data);
           

            if(data.matchResult == true){
              setIsWifiMatchModalShow(false)
              navigation.navigate('StudentFaceCheckIn',{studentID:studentID,teacherID:teacherID,uqID:uqID})
              console.log("Location match");
              
            }
            else if(data.matchResult == false){
              setIsWifiMatchModalShow(false)
              setIsMatchFalseModalShow(true)
              console.log("Location not match");

            }
        })
        .catch((error) => {
        console.error(error);
        });
    }
   
      useFocusEffect(
        React.useCallback(() => {
          // Do something when the screen is focused
          console.log("Student Home is focused");
          var localTime = moment(new Date()).format('HH:mm').toString()
          var localDate = moment(new Date()).format('YYYY-MM-DD').toString()

          if(studentIDState !=  null)
          _fetchSessionsAPI(selectedDate,localTime,localDate)

          console.log(studentIDState);
         
  
    
          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
            console.log("Student Home is unfocused");
          };
        }, [studentIDState,selectedDate])
      );


      const getWifiList = async (studentID,teacherID,uqID) => {
        askForUserPermissions()
        setIsWifiMatchModalShow(true)
        await wifi.reScanAndLoadWifiList(
          async wifis =>{
            var tempWifis = JSON.parse(wifis)
            var wifisArr = []
            tempWifis.forEach(wifisData => {
              if( wifisData.SSID == "@JumboPlus5GHz")
              console.log(wifisData.BSSID,wifisData.SSID);
              wifisArr.push(wifisData.BSSID)
            })
            // console.log(wifisArr);
            // setWifiList(wifisArr);
            await matchWifiAPI(wifisArr,uqID,teacherID,studentID)
          },
          error =>
            console.error(error) ||
            wifi.loadWifiList(
              async wifis =>{
                var tempWifis = JSON.parse(wifis)
                var wifisArr = []
                tempWifis.forEach(wifisData => {
                  wifisArr.push(wifisData.BSSID)
                })
                // console.log(wifisArr);
                // setWifiList(wifisArr);
                await matchWifiAPI(wifisArr,uqID,teacherID,studentID)
              },
              error => console.error(error)
            )
        );
        
        
       
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
        // console.log("Thank you for your permission! :)");
      } else {
        // console.log("You will not able to retrieve wifi available networks list");
      }
    } catch (err) {
      console.warn(err)
    }
  }


      const _fetchSessionsAPI = async (selectDate,currentTime,currentDate) => {

        var studentID = studentIDState
        var date  = selectDate



        
        await fetch(myEndpointURL+'/getClassroom?date='+date+'&studentID='+studentID+'&clientCurrentTime='+currentTime+'&clientCurrentDate='+currentDate)
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
              setSessionsData(data)
          })
          .catch((error) => {
              console.error(error);
          });
  
        
        
      }


      const CalendarHeader = () => {
        var myDateSplit = selectedDate.split('-')
        const myDate = myDateSplit[2]+'/'+myDateSplit[1]+'/'+myDateSplit[0]
        return(
          <View>
          
          
          <View style={{backgroundColor:'white',elevation:2,margin:15,borderRadius:20,padding:15}}>
          <CalendarPicker
                width={360}
                height={360}
                selectedDayColor="#9E76B4"
                onDateChange={async date => {
                  var localTime = moment(new Date()).format('HH:mm').toString()
                  var localDate = moment(new Date()).format('YYYY-MM-DD').toString()
                  var selectDate = moment(date).format('YYYY-MM-DD').toString()
                  console.log(selectDate);
                  setSelectedDate(selectDate)
                  await _fetchSessionsAPI(selectDate,localTime,localDate)
                }}
                
                
                
              />
              </View>
              <View style={{alignItems:'center',backgroundColor:'#9E76B4',marginHorizontal:16,padding:10,elevation:2,borderRadius:10,marginBottom:5}}>
              <Text style={{alignSelf:'center',color:'white'}}>การเช็คชื่อในวันที่ {myDate} ({localTime})</Text>
              {
                   sessionsData.length == 0  ? 
                   <Text style={{color:'white'}}>(ไม่พบรายวิชาเช็คชื่อในวันนี้)</Text>
                   :
                   <></>
              
                 }
              </View>
    
          
          </View>
        )
      }

      
      const Item = ({ item }) => (
        <View style={styles.item}>
          <View  style={statusButtStyle(item.sessionStatus)}>
                                
            {
              item.sessionStatus == -1 ? 
                <Text style={styles.statusText} >รอเปิดทำการเช็คชื่อ</Text>
              :
              (item.sessionStatus == 0 ? 
                <Text style={styles.statusText}>เปิดทำการเช็คชื่อแล้ว</Text> 
              : 
              < Text style={styles.statusText}>ปิดทำการเช็คชื่อแล้ว</Text> 
              ) 

            }
                                
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            
                    <View >
                       <View>
                          <Text style={styles.title}>ชื่อวิชา: {item.name}</Text>
                          <Text style={styles.title}>รหัสวิชา: { item.id == "" ? "" :  item.id}</Text>
                        </View>
                        <Text style={{fontSize:12}}>ภาคการศึกษา: {item.semester} </Text>
                        <Text style={{fontSize:12}}>ระยะเวลา: {moment( item.startDate).format("DD/MM/YYYY")} ถึง {moment( item.endDate).format("DD/MM/YYYY")} </Text>
                        <Text style={{fontSize:12}}>ทำซํ้าทุกวัน:</Text>
                        {
                        DupDay(item.duplicatedDay)
                      }
                        <Text style={{fontSize:12}}>เวลาเช็คชื่อ: {item.startTime} - {item.endTime} ({item.currentDate.split('-')[2] +'/'+ item.currentDate.split('-')[1] +'/'+ item.currentDate.split('-')[0] }) </Text>
                        <Text style={{fontSize:12}}>วันที่: {moment( item.currentDate).format("DD/MM/YYYY")} </Text>
                        
                        <Text style={{fontSize:12}}>อาจารย์: {item.teacherID} </Text>
                        <Text style={{fontSize:12}}>คำอธิบาย: {item.desc == '' ? "(ไม่ได้ระบุไว้)" : item.desc } </Text>
                        <Text style={{fontSize:12}}>รูปแบบการเช็คชื่อ: {item.isLocationSet ? "ระบุสถานที่" : "ออนไลน์"} </Text>
                    </View>
                    
            </View>

            <View >
              

              {item.sessionStatus == 0 ? 
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginTop:15}}>
                 {
                  item.isStudentChecked == false ? 
                
                  <View style={{backgroundColor:'#9E76B4',padding:12,elevation:2,borderRadius:20}}>
                  <TouchableOpacity onPress={async () => {
                    
                    const studentID = studentIDState
                    const teacherID = item.teacherID
                    const uqID = item.uqID
                

                    if(item.isLocationSet){
                      // await getWifiList(uqID,teacherID)
                      await getWifiList(studentID,teacherID,uqID)
                    
                    }
                    else{
                      // await checkInOnlineAPI(studentID,teacherID,uqID,checkDate,timestamp)
                      navigation.navigate('StudentFaceCheckIn',
                      {
                          studentID:studentID,
                          teacherID:teacherID,
                          uqID:uqID
                      }
                      
                      )
                    }

                    
                    
                    
                    

                    // navigation.navigate('StudentFaceCheckIn',{sessionTitle:item.title,sessionID:item.id})
                    }} >
                      <Text style={{color:'white'}}>เช็คชื่อเข้าห้องเรียน</Text>
                  </TouchableOpacity>
                  </View>
                    : 
                    <></> 
                   } 

                  {
                    (item.isStudentChecked && item.isSeatmapSet && item.isLocationSet ) ? 
                  <View style={{backgroundColor:'#9E76B4',padding:12,elevation:2,borderRadius:20}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Seatmap',{
                      uqID:item.uqID,
                      teacherID:item.teacherID,
                      date: item.currentDate
                      })} >
                        <Text style={{color:'white'}}>สร้างแผนผังที่นั่ง</Text>
                    </TouchableOpacity>
                  </View>
                  :
                  <></>
                  }
                  
              </View>
              :
              <></>
              }

             
              
              
              {
                (item.sessionStatus == -1 || (item.sessionStatus == 0 && item.isStudentChecked == false)  ) ?
                <></>
                :
                <View style={{backgroundColor:'#9E76B4',padding:12,elevation:2,borderRadius:20,alignSelf:'center',marginTop:15}}>
                  <TouchableOpacity onPress={async () => {
                    navigation.navigate('SessionReport',{
                      className:item.name,
                      classID:item.id,
                      uqID:item.uqID,
                      teacherID:item.teacherID,
                      studentID:studentIDState
                    })
                    }} >
                      <Text style={{color:'white'}}>สรุปผลการเช็คชื่อ</Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
            
                          {
                            item.sessionStatus == -1 ? 
                            <></>
                            :
                            item.isStudentChecked ? 
                            <View style={{marginTop:20,alignSelf:'center',elevation:2,backgroundColor:'white',padding:6,paddingHorizontal:13,borderRadius:15,borderColor:'green',borderWidth:3}}>
                              <View style={{flexDirection:'row'}}>
                                <Text style={{alignSelf:'center',marginRight:10,color:'green'}}>เช็คชื่อแล้ว</Text>
                                <Icon name="check-circle" size={50} color='green'/>
                              </View>
                            </View>
                            :
                            <View style={{marginTop:20,alignSelf:'center',elevation:2,backgroundColor:'white',padding:6,paddingHorizontal:13,borderRadius:15,borderColor:'red',borderWidth:3}}>
                              <View style={{flexDirection:'row'}}>
                                <Text style={{alignSelf:'center',marginRight:10,color:'red'}}>ยังไม่ได้เช็คชื่อ</Text>
                                <Icon name="times-circle" size={50} color='red'/>
                              </View>
                            </View>
                          }
                            
                        </View>   
            
          
        
      );

      const renderItem = ({ item }) => (
        <Item item={item} />
      );

    return(
        <>
        
                
                <SafeAreaView style={{flex:1}}>
                  
                <FlatList
                    data={sessionsData}
                    renderItem={renderItem}
                    keyExtractor={item => item.uqID}
                    ListHeaderComponent={CalendarHeader()}
                />
                <Modal
                      animationType="fade"
                      transparent={true}
                      visible={isWifiMatchModalShow}
                      onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      }}
                  >
                      <View style={{backgroundColor:'white',alignItems:'center',justifyContent:'center',flex:1,marginLeft:20,marginRight:20,marginTop:220,borderRadius:20,elevation:2,marginBottom:190}}>
                          <View style={{flex:1,justifyContent:'center'}}>
                            <Text>กำลังตรวจสอบสถานที่...</Text>
                          </View>
                          <View style={{flex:3,justifyContent:'center'}}>
                            <ActivityIndicator size={200} color="#9E76B4" />
                          </View>
                      </View>
                </Modal>
                
                <Modal
                      animationType="fade"
                      transparent={true}
                      visible={isMatchFalseModalShow}
                      onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      }}
                  >
                    
                      <View style={{backgroundColor:'white',alignItems:'center',justifyContent:'center',flex:1,marginLeft:20,marginRight:20,marginTop:220,borderRadius:20,elevation:2,marginBottom:190}}>
                          <View style={{flex:1,justifyContent:'center'}}>
                             <Icon name="times" size={100} color='red'/>
                          </View>
                          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text  >สถานที่ไม่ถูกต้อง !!</Text>
                            <Text >โปรดอยู่ในบริเวณที่ให้ทำการเช็คชื่อ</Text>
                            <Text >(หากเกิดข้อผิดพลาดให้พบอาจารย์ผู้สอน)</Text>
                          </View>
                          
                          <TouchableOpacity style={{marginBottom:30,backgroundColor:"#9E76B4",padding:8,elevation:2,borderRadius:20,width:80,alignItems:'center'}} onPress={() => setIsMatchFalseModalShow(false)}>
                            <Text style={{color:'white'}}>Close</Text>
                          </TouchableOpacity>
                      </View>
                    
                </Modal>
                </SafeAreaView>

        </>
            
        
        
        
        

    );

}

const DupDay = (dupDate) => {
  let dupDayColor = ['','','','','','','']

  if(dupDate[0]) dupDayColor[6] = 'green'
        else dupDayColor[6] = '#a9a9a9'

        if(dupDate[1]) dupDayColor[0] = 'green'
        else dupDayColor[0] = '#a9a9a9'

        if(dupDate[2]) dupDayColor[1] = 'green'
        else dupDayColor[1] = '#a9a9a9'

        if(dupDate[3]) dupDayColor[2] = 'green'
        else dupDayColor[2] = '#a9a9a9'

        if(dupDate[4]) dupDayColor[3] = 'green'
        else dupDayColor[3] = '#a9a9a9'

        if(dupDate[5]) dupDayColor[4] = 'green'
        else dupDayColor[4] = '#a9a9a9'

        if(dupDate[6]) dupDayColor[5] = 'green'
        else dupDayColor[5] = '#a9a9a9'
  
  return (
    <View   style={{flexDirection:'row',marginVertical:5,alignSelf:'center'}}>
      <View style={{backgroundColor:dupDayColor[0],paddingHorizontal:15,borderTopLeftRadius:10,borderBottomLeftRadius:10,borderColor:'white',borderWidth:0.5}}><Text style={{color:'white'}}>จ</Text></View>
      <View style={{backgroundColor:dupDayColor[1],paddingHorizontal:15,borderColor:'white',borderWidth:0.5}}><Text style={{color:'white'}}>อ</Text></View>
      <View style={{backgroundColor:dupDayColor[2],paddingHorizontal:15,borderColor:'white',borderWidth:0.5}}><Text style={{color:'white'}}>พ</Text></View>
      <View style={{backgroundColor:dupDayColor[3],paddingHorizontal:11,borderColor:'white',borderWidth:0.5}}><Text style={{color:'white'}}>พฤ</Text></View>
      <View style={{backgroundColor:dupDayColor[4],paddingHorizontal:15,borderColor:'white',borderWidth:0.5}}><Text style={{color:'white'}}>ศ</Text></View>
      <View style={{backgroundColor:dupDayColor[5],paddingHorizontal:15,borderColor:'white',borderWidth:0.5}}><Text style={{color:'white'}}>ส</Text></View>
      <View style={{backgroundColor:dupDayColor[6],paddingHorizontal:15,borderTopRightRadius:10,borderBottomEndRadius:10,borderColor:'white',borderWidth:0.5}}><Text style={{color:'white'}}>อา</Text></View>
    </View> 
  )
}

const statusButtStyle = (classStatus) => {
  let background = ''
  if(classStatus == -1){
    background = 'orange'
  }
  else if(classStatus == 0)
  {
    background = 'green'
  }
  else if(classStatus == 1)
  {
    background = '#9E76B4'
  }
  
  
  return(
    {
      backgroundColor:background,
      alignSelf:'baseline',
      borderRadius:10,
      padding:10,
      alignSelf:'center',
      marginBottom:10
    }
  )
}

    

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: 'white',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius:20,
      elevation : 2,
    },
    title: {
      fontSize: 19,
    },
    statusText: {
      color:'white'
    }
  });

export default StudentHome