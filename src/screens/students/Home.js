import React,{useState,useEffect,useRef} from 'react'
import { Button, View,Text,StyleSheet,StatusBar,FlatList,TouchableOpacity,PermissionsAndroid } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Calendar from '../../components/CalendarPicker'
import {useFocusEffect} from '@react-navigation/native';
import wifi from 'react-native-android-wifi';
import AsyncStorage from '@react-native-community/async-storage'

const URL = require('../../config/endpointConfig')

const myEndpointURL =  URL.myEndpointStudent

const moment = require('moment')

       // Hook
  function usePrevious(value) {
        // The ref object is a generic container whose current property is mutable ...
        // ... and can hold any value, similar to an instance property on a class
        const ref = useRef();
        
        // Store current value in ref
        useEffect(() => {
          ref.current = value;
        }, [value]); // Only re-run if value changes
        
        // Return previous value (happens before update in useEffect above)
        return ref.current;
    }



const StudentHome = ({navigation}) => {

  const [selectedDate,setSelectedDate] = useState(moment(new Date()).format('YYYY-MM-DD').toString())
  const [currentDate,setcurrentDate] = useState(moment(new Date()).format('YYYY-MM-DD').toString())
    const [currentTime,setcurrentTime] = useState(moment(new Date()).format('HH:mm').toString())
    const [wifiList,setWifiList] = useState([])
    const [sessionsData,setSessionsData] = useState(null)
    const [selectedClassData,setSelectedClassData] = useState({uqID:null,teacherID:null})
    const [checkInFetchData,setCheckInFetchData] = useState({uqID:null,teacherID:null})

    const [locMatchResult,setLocMatchResult] = useState(false)


    const [studentIDState,setStudentIDState] = useState(null)

    const _retrieveUserData = async () => {
      const  studentID = await AsyncStorage.getItem('uniqueIDStudent');
      // const  studentID = '600610748'
      setStudentIDState(studentID)

    }

    // useEffect(() => {
    //   const interval =  setInterval(async () => {
    //      await getWifiList()
    //     //  console.log(wifiList);
    //     // setCount(count+1)
    //     // console.log(count);
        
    //     }, 10000);
    //     return () => clearInterval(interval);
    // },[wifiListStr])

    
    
   

   

    useEffect(() => {

        const matchWifiAPI = async () => {
          await fetch(myEndpointURL+'/matchMAC', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                studentWifiList:wifiList,
                classData:selectedClassData
            })
            })
            .then((response) => response.json())
            .then(async (data) => {
                
                console.log(data);
               

                if(data.matchResult == true){
                  setLocMatchResult(true)
                  console.log("Location match");
                  console.log(checkInFetchData);
                  await checkInAPI()
                }
                else if(data.matchResult == false){
                  setLocMatchResult(false)
                  console.log("Location not match");

                }
            })
            .catch((error) => {
            console.error(error);
            });
        }

      if(wifiList.length!=0){
        matchWifiAPI()
      }

    },[wifiList])

    

      useFocusEffect(
        React.useCallback(() => {
          // Do something when the screen is focused
          console.log("Student Home is focused");
          // var currentDate =moment(new Date()).format('DD-MM-YYYY').toString()
          _retrieveUserData()

          if(studentIDState !=  null)
          _fetchSessionsAPI(selectedDate)

          console.log(studentIDState);
         
  
    
          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
            console.log("Student Home is unfocused");
          };
        }, [studentIDState,selectedDate])
      );


      const getWifiList = async () => {

        await wifi.reScanAndLoadWifiList(
          wifis =>{
            var tempWifis = JSON.parse(wifis)
            var wifisArr = []
            tempWifis.forEach(wifisData => {
              wifisArr.push(wifisData.BSSID)
            })
            // console.log(wifisArr);
            setWifiList(wifisArr);
          },
          error =>
            console.error(error) ||
            wifi.loadWifiList(
              wifis =>{
                var tempWifis = JSON.parse(wifis)
                var wifisArr = []
                tempWifis.forEach(wifisData => {
                  wifisArr.push(wifisData.BSSID)
                })
                // console.log(wifisArr);
                setWifiList(wifisArr);
              },
              error => console.error(error)
            )
        );
        
        
       
    }

    const showWifiList = async () => {
      await askForUserPermissions();
      await getWifiList()

      wifiList.forEach(wifiData => {
        console.log(wifiData.BSSID_dotConcat.split('.')[0]+ '  level: '+wifiData.level);
       
      })
      console.log("-------------------------------------------------------------------------");
      console.log("-------------------------------------------------------------------------");
      
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


      const _fetchSessionsAPI = async (selectDate) => {
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


      const checkInAPI = async () => {
        await fetch(myEndpointURL+'/checkIn', {
          method: 'POST',
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            checkInFetchData:checkInFetchData
          })
          })
          .then((response) => response.json())
          .then((data) => {
              
              console.log(data);
          })
          .catch((error) => {
          console.error(error);
          });
      }

     
      
      


      const CalendarHeader = () => {
        return(
          <View>
          <Text style={{alignSelf:'center'}}>StudentID: {studentIDState}</Text>
          <Calendar style={{margin:20 , padding:20 , borderRadius:20 , elevation:5 , marginTop:30}} 
                    onDayPress={async day => {
                      var selectDate = day.year+'-'+day.month+'-'+day.day
                      setSelectedDate(selectDate)
                      await _fetchSessionsAPI(selectDate)
                    }}
          />
          <Text style={{alignSelf:'center'}}>Select: {selectedDate}</Text>
          
            {
              locMatchResult ? 
              <View style={{alignSelf:'center',backgroundColor:'green',padding:15,borderRadius:15}}>
              <Text style={{color:'white'}}>{locMatchResult.toString()}</Text>
              </View>
              :
              <View style={{alignSelf:'center',backgroundColor:'red',padding:15,borderRadius:15}}>
              <Text style={{color:'white'}}>{locMatchResult.toString()}</Text>
              </View>
            }
          
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
                    <View style={{justifyContent:'space-between'}}>
                        
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
            </View>
            <View >
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginTop:15}}>
                  <View style={{backgroundColor:'#9E76B4',padding:12,elevation:7,borderRadius:20}}>
                  <TouchableOpacity onPress={async () => {
                    
                    const studentID = studentIDState
                    const teacherID = item.teacherID
                    const uqID = item.uqID
                    const checkDate = moment(new Date()).format('YYYY-MM-DD').toString()
                    const timestamp = moment(new Date()).format('HH:mm').toString()
                    setSelectedClassData({uqID:uqID,teacherID:teacherID})
                    setCheckInFetchData({
                      studentID:studentID,
                      teacherID:teacherID,
                      uqID:uqID,
                      checkDate:checkDate,
                      timestamp:timestamp
                    })
                    



                    
                    await getWifiList()

                    // navigation.navigate('StudentFaceCheckIn',{sessionTitle:item.title,sessionID:item.id})
                    }} >
                      <Text style={{color:'white'}}>Check-in</Text>
                  </TouchableOpacity>
                  </View>
                  <View style={{backgroundColor:'#9E76B4',padding:12,elevation:7,borderRadius:20}}>
                  <TouchableOpacity onPress={() => navigation.navigate('Seatmap',{sessionTitle:item.title,sessionID:item.id})} >
                      <Text style={{color:'white'}}>Seat map</Text>
                  </TouchableOpacity>
                  </View>
              </View>
              <View style={{backgroundColor:'#9E76B4',padding:12,elevation:7,borderRadius:20,alignSelf:'center',marginTop:15}}>
                  <TouchableOpacity onPress={() => navigation.navigate('SessionReport',{sessionTitle:item.title,sessionID:item.id})} >
                    <Text style={{color:'white'}}>Report</Text>
                  </TouchableOpacity>
              </View>
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