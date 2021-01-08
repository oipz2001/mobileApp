import React,{useEffect, useState} from 'react'
import { Button, View,Text,StyleSheet,FlatList,StatusBar,TouchableOpacity,Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Calendar from '../../components/CalendarPicker'
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'
import wifi from 'react-native-android-wifi';

const URL = require('../../config/endpointConfig')

const myEndpointURL =  URL.myEndpointTeacher

const defaultEndpoint = URL.endpointDefault
const moment = require('moment')



const TeacherHome = ({ navigation }) => {
    const [selectedId, setSelectedId] = useState(null);
    // DD-MM-YYYY
    // YYYY-MM-DD
    const [selectedDate,setSelectedDate] = useState(moment(new Date()).format('YYYY-MM-DD').toString())

    // const [currentDate,setcurrentDate] = useState(moment(new Date()).format('YYYY-MM-DD').toString())
    // const [currentTime,setcurrentTime] = useState(moment(new Date()).format('HH:mm').toString())

    const [localTime,setLocalTime] = useState(moment(new Date()).format('HH:mm').toString())

    const [sessionsData,setSessionsData] = useState(null)
    const [teacherIDState,setTeacherIDState] = useState(null)

    const [wifiList,setWifiList] = useState([])

    const _retrieveUserData = async () => {
      const  teacherID = await AsyncStorage.getItem('uniqueIDTeacher');
      setTeacherIDState(teacherID)

    }

    useEffect(() => {
      _retrieveUserData()
    },[])


    useEffect(() =>{
      const interval =  setInterval(async () => {
        setLocalTime(moment(new Date()).format('HH:mm').toString())
            
      }, 1000);

      

      const funcFetchSession = async () => {
      var localTime = moment(new Date()).format('HH:mm').toString()
       var localDate = moment(new Date()).format('YYYY-MM-DD').toString()
        await _fetchSessionsAPI(selectedDate,localTime,localDate)
      };

      funcFetchSession()
        
  
      return () => clearInterval(interval);
    },[localTime])



    // useEffect(() => {

    //   const updateWifiLocAPI = async (uqID,teacherID,wifis) => {

    //     if(wifis.length != 0){
    //       await fetch(defaultEndpoint+'/webApp/addNewStudents', {
    //         method: 'POST',
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //           uqID: uqID,
    //           teacherID:teacherID,
    //           wifiList: wifis
    
    //         })
    //         })
    //         .then((response) => response.json())
    //         .then((data) => {
                
    //             console.log(data);
    //         })
    //         .catch((error) => {
    //         console.error(error);
    //         });
    //     }

    //   }



    //   updateWifiLocAPI()

    // },[wifiList])



    useFocusEffect(
      React.useCallback(() => {
        // Do something when the screen is focused
        console.log("Home is focused");
       var localTime = moment(new Date()).format('HH:mm').toString()
       var localDate = moment(new Date()).format('YYYY-MM-DD').toString()

        if(teacherIDState !=  null)
        _fetchSessionsAPI(selectedDate,localTime,localDate)

        console.log(teacherIDState);

  
        return () => {
          // Do something when the screen is unfocused
          // Useful for cleanup functions
          console.log("Home is unfocused");
        };
      }, [teacherIDState,selectedDate])
    );

    // useEffect(() => {

    //   var localTime = moment(new Date()).format('HH:mm').toString()
    //   var localDate = moment(new Date()).format('YYYY-MM-DD').toString()

    //     if(teacherIDState !=  null)
    //     _fetchSessionsAPI(selectedDate,localTime,localDate)

    //     console.log(teacherIDState);

    // }, [teacherIDState,selectedDate])


    const _fetchSessionsAPI = async (selectDate,currentTime,currentDate) => {
      var teacherID = teacherIDState
      var date  = selectDate

      // console.log(date);
      // console.log(currentDate);

      await fetch(myEndpointURL+'/getSession?date='+date+'&teacherID='+teacherID+'&clientCurrentTime='+currentTime+'&clientCurrentDate='+currentDate)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setSessionsData(data)
        })
        .catch((error) => {
            console.error(error);
        });

      
      
    }

    const _addStudentTestAPI = async (classUqID) => {
      var uqID = classUqID
      var teacherID = teacherIDState
      var studentList = [
        {id:'600610748',name:'Pathomporn'},
        {id:'600610750',name:'Parinyakorn'},
        {id:'600610751',name:'Pawaris'},
        {id:'600610777',name:'Paradee'},
        {id:'600610888',name:'Paradee'}
      ]
      // var studentList = [
      //   {id:'6006107488',name:'Pathomporn'},
      //   {id:'600610750',name:'Parinyakorn'}
      // ]
      console.log(uqID);
      await fetch(defaultEndpoint+'/webApp/addNewStudents', {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          uqID: uqID,
          teacherID:teacherID,
          studentList:studentList

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

    const _cancelSession = async (date,uqClassID) => {
      console.log(date);
      console.log(uqClassID);
      var teacherID = teacherIDState

      // console.log(teacherID);

       
        await fetch(myEndpointURL+'/cancelSession', {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uqID:uqClassID,
            date:date,
            teacherID:teacherID
        })
        })
        .then((response) => response.json())
        .then((data) => {
            
            console.log(data);
        })
        .catch((error) => {
        console.error(error);
        });

    };


    const updateWifiLocAPI = async (uqID,teacherID) => {

      await wifi.reScanAndLoadWifiList(
        async wifis =>{
          var tempWifis = JSON.parse(wifis)
          var wifisArr = []
          for(var i=0;i<6;i++){
            wifisArr.push(tempWifis[i].BSSID)
          }
          
              // setWifiList(wifisArr);
              if(wifisArr.length != 0){
                await fetch(myEndpointURL+'/updateClassLoc', {
                  method: 'POST',
                  headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    uqID: uqID,
                    teacherID:teacherID,
                    wifiList: wifisArr
          
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
        },
        async error =>
          console.error(error) ||
          wifi.loadWifiList(
            async wifis =>{
              var tempWifis = JSON.parse(wifis)
              var wifisArr = []
              for(var i=0;i<6;i++){
                wifisArr.push(tempWifis[i].BSSID)
              }
              // setWifiList(wifisArr);
              if(wifisArr.length != 0){
                  await fetch(myEndpointURL+'/updateClassLoc', {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                      uqID: uqID,
                      teacherID:teacherID,
                      wifiList: wifisArr
            
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
            },
            error => console.error(error)
          )
      );
      
      
     
  }


    

    const renderItem = ({ item }) => {
        const Item = ({ item, onPress, style }) => (
            
            <TouchableOpacity   style={[styles.item, style]}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View >
                        <View style={{flexDirection:'row'}}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={{fontSize:16,alignSelf:'center'}}>  ({item.id})</Text>
                        </View>
                        <Text style={styles.descrption}>Semester: {item.semester} </Text>
                        <Text style={styles.descrption}>Date: {item.currentDate} </Text>
                        <Text style={styles.descrption} >Time: {item.startTime} - {item.endTime} </Text>
                        <Text style={styles.descrption}>Description: {item.desc} </Text>
                        <Text style={styles.descrption}>Checking format: {item.isLocationSet ? 'On Location' : 'Online'} </Text>
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
              

              {
                item.isStudentAdded ?
                <View style={{flexDirection:'column',margin:15}}>
                    <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-around'}}>
                          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                              <Icon name="users" size={20} />
                              <Text>  {item.totalStudent} </Text>
                          </View>
                          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                              <Icon name="check" size={25} color='green'/>
                              <Text>  {item.checkedStudent}</Text>
                          </View>
                          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                              <Icon name="times" size={25} color='red'/>
                              <Text>  {item.uncheckedStudent}</Text>
                          </View>
                      </View>
                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',marginTop:15}}>
                        <View style={{backgroundColor:'#9E76B4',padding:12,elevation:7,borderRadius:20}}>
                        <TouchableOpacity onPress={() => { navigation.navigate('RoomStat',{uqID:item.uqID,selectedDate:selectedDate})}} >
                            <Text style={{color:'white'}}>Statistics</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{backgroundColor:'#9E76B4',padding:12,elevation:7,borderRadius:20}}>
                        <TouchableOpacity onPress={() => navigation.navigate('TeacherSeatmap',{uqID:item.uqID,selectedDate:selectedDate})} >
                            <Text style={{color:'white'}}>Seat map</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    
                  
                  </View> 
                :
                <View style={{flexDirection:'row',alignSelf:'center',margin:15}}>
                  <TouchableOpacity style={{backgroundColor:'yellow',padding:10,borderRadius:10}}>
                    <Text style={{color:'red'}}>Please add your students</Text>
                  </TouchableOpacity>
                </View> 



              }

            
            <View style={{backgroundColor:'#9E76B4',padding:12,elevation:7,borderRadius:20,alignSelf:'center'}}>
                <TouchableOpacity onPress={async () => {
                    await updateWifiLocAPI(item.uqID,teacherIDState)
                }}  >
                  <View style={{flexDirection:'row'}}>
                    <Icon name="map-marker" size={25} color="white" /> 
                    <Text style={{color:'white',marginLeft:7}}>Update location</Text>      
                  </View>
                </TouchableOpacity>
                
            
                
                
            </View>

            <View>
                <TouchableOpacity style={{backgroundColor:'red',padding:15,elevation:5,borderRadius:25,alignSelf:'center',marginTop:15}}
                onPress={async () => {
                  var localTime = moment(new Date()).format('HH:mm').toString()
                  var localDate = moment(new Date()).format('YYYY-MM-DD').toString()
                  await _cancelSession(item.currentDate,item.uqID)
                  await _fetchSessionsAPI(item.currentDate,localTime,localDate)
                  }} >
                  <Text style={{color:'white'}}>Cancel</Text>
                </TouchableOpacity>
            </View>
            {!item.isStudentAdded ? 
            <View>
                <TouchableOpacity style={{backgroundColor:'green',padding:15,elevation:5,borderRadius:25,alignSelf:'center',marginTop:15}}
                onPress={async () => {
                  var localTime = moment(new Date()).format('HH:mm').toString()
                  var localDate = moment(new Date()).format('YYYY-MM-DD').toString()
                   await _addStudentTestAPI(item.uqID)
                  await _fetchSessionsAPI(item.currentDate,localTime,localDate)
                  }} >
                      <Text style={{color:'white'}}>Test Add Students</Text>
                </TouchableOpacity>
            </View>
            :
            <></>
            }
            
            
            </TouchableOpacity>
            
            
                
          );
        return (
          <Item
            item={item}
            onPress={() => {
              setSelectedId(item.id)
              
            }}
            style={{ backgroundColor:'white' }}
          />
        
         
          
        );
      };


       const HeaderFlatlistComponent = () => {
          return(
            <>
                <Text style={{alignSelf:'center'}}>Select {selectedDate}</Text>
                <Text style={{alignSelf:'center'}}>TeacherID: {teacherIDState}</Text>
                <Text style={{alignSelf:'center'}}>Local time:  {localTime}</Text>
                <Calendar 
                style={{margin:20 , padding:20 , borderRadius:20 , elevation:5 , marginTop:30}}
                onDayPress={async day => {
                  var localTime = moment(new Date()).format('HH:mm').toString()
                  var localDate = moment(new Date()).format('YYYY-MM-DD').toString()
                  var selectDate = day.dateString
                  console.log(selectDate);
                  setSelectedDate(selectDate)
                  await _fetchSessionsAPI(selectDate,localTime,localDate)
                  }}
                  
                />
                

                <View style={{alignItems:'center',margin:15,marginBottom:20}}>     
                 <TouchableOpacity  style={{alignItems:'center',backgroundColor:'white',padding:17,borderRadius:20,elevation:8}} onPress={() => navigation.navigate('TeacherCreateRoom')}>
                
                    <Icon name="plus-circle" size={60}/>
                    <Text >Add Sessions</Text>
                 </TouchableOpacity>
                 </View>  
                 <Text style={{alignSelf:'center'}}>Select {selectedDate}</Text>        
                      
               
            </>
          )
      }
      

    return(
        <>
            <SafeAreaView style={{flex:1}}>
                <FlatList
                    data={sessionsData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.uqID}
                    extraData={selectedId}
                    style={{marginTop:10}}
                    ListHeaderComponent={<HeaderFlatlistComponent/>}
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
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius:20,
      elevation:5,
    },
    title: {
      fontSize: 22,
    },
    descrption:{
        fontSize:10
    }
  });

export default TeacherHome