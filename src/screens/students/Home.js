import React,{useState,useEffect,useRef} from 'react'
import { Button, View,Text,StyleSheet,StatusBar,FlatList,TouchableOpacity,PermissionsAndroid,Modal,ActivityIndicator  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Calendar from '../../components/CalendarPicker'
import {useFocusEffect} from '@react-navigation/native';
import wifi from 'react-native-android-wifi';
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';

const URL = require('../../config/endpointConfig')

const myEndpointURL =  URL.myEndpointStudent

const moment = require('moment')


const StudentHome = ({navigation,route}) => {

  const [selectedDate,setSelectedDate] = useState(moment(new Date()).format('YYYY-MM-DD').toString())
  // const [currentDate,setcurrentDate] = useState(moment(new Date()).format('YYYY-MM-DD').toString())
  //   const [currentTime,setcurrentTime] = useState(moment(new Date()).format('HH:mm').toString())
    const [wifiList,setWifiList] = useState([])
    const [sessionsData,setSessionsData] = useState(null)


    const [localTime,setLocalTime] = useState(moment(new Date()).format('HH:mm').toString())

    const [studentIDState,setStudentIDState] = useState(null)

    const [isWifiMatchModalShow,setIsWifiMatchModalShow] = useState(false)

    const [isMatchFalseModalShow,setIsMatchFalseModalShow] = useState(false)



    const _retrieveUserData = async () => {
      const  studentID = await AsyncStorage.getItem('uniqueIDStudent');
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
        setIsWifiMatchModalShow(true)
        await wifi.reScanAndLoadWifiList(
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
              // console.log(data);
              setSessionsData(data)
          })
          .catch((error) => {
              console.error(error);
          });
  
        
        
      }


      const CalendarHeader = () => {
        return(
          <View>
          <Text style={{alignSelf:'center'}}>StudentID: {studentIDState}</Text>
          <Text style={{alignSelf:'center'}}>Local time: {localTime}</Text>
          <Calendar style={{margin:20 , padding:20 , borderRadius:20 , elevation:5 , marginTop:30}} 
                    onDayPress={async day => {
                      var localTime = moment(new Date()).format('HH:mm').toString()
                      var localDate = moment(new Date()).format('YYYY-MM-DD').toString()
                      var selectDate = day.dateString
                      setSelectedDate(selectDate)
                      await _fetchSessionsAPI(selectDate,localTime,localDate)
                    }}
          />
          <Text style={{alignSelf:'center'}}>Select: {selectedDate}</Text>
    
          
          </View>
        )
      }

      
      const Item = ({ item }) => (
        <View style={styles.item}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View >
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={{fontSize:17}}>({item.id})</Text>
                        <Text style={{fontSize:12}}>Time: {item.startTime} - {item.endTime} </Text>
                        <Text style={{fontSize:12}}>Teacher: {item.teacherID} </Text>
                        <Text style={{fontSize:12}}>Description: {item.desc} </Text>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <View >
                            
                              {
                            item.sessionStatus == -1 ? 
                            <Text style={{color:'orange'}} >Waiting</Text>
                            :
                            (item.sessionStatus == 0 ? 
                            <Text style={{color:'green'}}>Opening</Text> 
                            : 
                            (item.sessionStatus == 1 ? 
                            <Text style={{color:'red'}}>Closed</Text> 
                            :
                            <Text style={{color:'red'}}>In progress</Text> 
                            )
                            ) 

                          }
                              
                        </View>
                        <View style={{marginTop:30}}>
                          {
                            item.isStudentChecked ? 
                            <Icon name="check-circle" size={60} color='green'/>
                            :
                            <Icon name="times-circle" size={60} color='red'/>
                          }
                            
                        </View>     
                    </View>
            </View>

            <View >
              

              {item.sessionStatus == 0 ? 
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginTop:15}}>
                {
                  item.isStudentChecked == false ?
                
                  <View style={{backgroundColor:'#9E76B4',padding:12,elevation:7,borderRadius:20}}>
                  <TouchableOpacity onPress={async () => {
                    
                    const studentID = studentIDState
                    const teacherID = item.teacherID
                    const uqID = item.uqID
                    // setSelectedClassData({uqID:uqID,teacherID:teacherID})
                    // setCheckInFetchData({
                    //   studentID:studentID,
                    //   teacherID:teacherID,
                    //   uqID:uqID,
                    //   checkDate:checkDate,
                    //   timestamp:timestamp
                    // })

                    

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
                      <Text style={{color:'white'}}>Check-in</Text>
                  </TouchableOpacity>
                  </View>
                   : 
                   <></> 
                   } 
                  {
                    (item.isStudentChecked && item.isSeatmapSet) ? 
                  <View style={{backgroundColor:'#9E76B4',padding:12,elevation:7,borderRadius:20}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Seatmap',{
                      uqID:item.uqID,teacherID:item.teacherID
                      })} >
                        <Text style={{color:'white'}}>Create Seat Map</Text>
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
                <View style={{backgroundColor:'#9E76B4',padding:12,elevation:7,borderRadius:20,alignSelf:'center',marginTop:15}}>
                  <TouchableOpacity onPress={async () => {
                    navigation.navigate('SessionReport',{className:item.name,classID:item.id,uqID:item.uqID,teacherID:item.teacherID,studentID:studentIDState})
                    }} >
                      <Text style={{color:'white'}}>Report</Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
            
          
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
                    ListHeaderComponent={<CalendarHeader/>}
                />
                <Modal
                      animationType="fade"
                      transparent={true}
                      visible={isWifiMatchModalShow}
                      onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      }}
                  >
                      <View style={{backgroundColor:'white',alignItems:'center',justifyContent:'center',flex:1,marginLeft:20,marginRight:20,marginTop:220,borderRadius:20,elevation:8,marginBottom:190}}>
                          <View style={{flex:1,justifyContent:'center'}}>
                            <Text>Verify Location...</Text>
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
                    
                      <View style={{backgroundColor:'white',alignItems:'center',justifyContent:'center',flex:1,marginLeft:20,marginRight:20,marginTop:220,borderRadius:20,elevation:8,marginBottom:190}}>
                          <View style={{flex:1,justifyContent:'center'}}>
                             <Icon name="times" size={100} color='red'/>
                          </View>
                          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text  >สถานที่ไม่ถูกต้อง !!</Text>
                            <Text >โปรดอยู่ในบริเวณที่ให้ทำการเช็คชื่อ</Text>
                            <Text >(หากเกิดข้อผิดพลาดให้พบอาจารย์ผู้สอน)</Text>
                          </View>
                          
                          <TouchableOpacity style={{marginBottom:30,backgroundColor:"#9E76B4",padding:8,elevation:8,borderRadius:20,width:80,alignItems:'center'}} onPress={() => setIsMatchFalseModalShow(false)}>
                            <Text style={{color:'white'}}>Close</Text>
                          </TouchableOpacity>
                      </View>
                    
                </Modal>
                </SafeAreaView>

        </>
            
        
        
        
        

    );

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
      elevation : 5,
    },
    title: {
      fontSize: 25,
    },
  });

export default StudentHome