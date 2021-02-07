import React,{useEffect, useState} from 'react'
import { Button, View,Text,StyleSheet,FlatList,StatusBar,TouchableOpacity,Image,Modal,ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Calendar from '../../components/CalendarPicker'
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'
import wifi from 'react-native-android-wifi';
import CalendarPicker from 'react-native-calendar-picker';
const URL = require('../../config/endpointConfig')

const myEndpointURL =  URL.myEndpointTeacher

const defaultEndpoint = URL.endpointDefault
const moment = require('moment')



const TeacherHome = ({ navigation }) => {
    const [selectedId, setSelectedId] = useState(null);
    // DD-MM-YYYY
    // YYYY-MM-DD
    const [selectedDate,setSelectedDate] = useState(moment(new Date()).format('YYYY-MM-DD').toString())


    const [localTime,setLocalTime] = useState(moment(new Date()).format('HH:mm').toString())

    const [sessionsData,setSessionsData] = useState(null)
    const [teacherIDState,setTeacherIDState] = useState(null)

    const [wifiList,setWifiList] = useState([])

    const [isInprogressModalShow,setIsInprogressModalShow] = useState(false)

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



    useFocusEffect(
      React.useCallback(() => {
        // Do something when the screen is focused
        
       var localTime = moment(new Date()).format('HH:mm').toString()
       var localDate = moment(new Date()).format('YYYY-MM-DD').toString()
       console.log("Home is focused");

        if(teacherIDState !=  null)
          _fetchSessionsAPI(selectedDate,localTime,localDate)

        

  
        return () => {
          console.log("Home is unfocused");
        };
      }, [teacherIDState,selectedDate])
    );

    // useEffect(() => {

    //   var localTime = moment(new Date()).format('HH:mm').toString()
    //   var localDate = moment(new Date()).format('YYYY-MM-DD').toString()

    //     if(teacherIDState !=  null)
    //     _fetchSessionsAPI(selectedDate,localTime,localDate)

    //     // console.log(teacherIDState);

    // }, [selectedDate])


    const _fetchSessionsAPI = async (selectDate,currentTime,currentDate) => {
      var teacherID = teacherIDState
      var date  = selectDate

      console.log(date);
      console.log(currentDate);

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
        {id:'600610888',name:'Paradee1'},
        {id:'600610749',name:'PARINYA SEETAWAN'},
        {id:'600610758',name:'JETDILOK NGAMKHAM'}
      ]
      
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
      setIsInprogressModalShow(true)
      await wifi.reScanAndLoadWifiList(
        async wifis =>{
          var tempWifis = JSON.parse(wifis)
          var wifisArr = []
          for(var i=0;i<tempWifis.length;i++){
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
                      setIsInprogressModalShow(false)
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
              for(var i=0;i<tempWifis.length;i++){
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
                        setIsInprogressModalShow(false)
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
            
           
           
              
              
        
            <View   style={[styles.item, style]}>
              <View style={statusButtStyle(item.sessionStatus)} >
                            
                            {
                              item.sessionStatus == -1 ? 
                              <Text style={styles.statusText} >รอเปิดทำการเช็คชื่อ</Text>
                              :
                              (item.sessionStatus == 0 ? 
                  
                              <Text style={styles.statusText}>เปิดให้ทำการเช็คชื่อ</Text>
                              : 
                              (item.sessionStatus == 1 ? 
                              <Text style={styles.statusText}>ปิดทำการเช็คชื่อแล้ว</Text> 
                              :
                              <Text style={styles.statusText}>รอการเพิ่มรายชื่อนักศึกษา</Text> 
                              )
                              ) 

                            }
                            
              </View>
              <View>
                    <View >
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                          <View>
                            <Text style={styles.title}>ชื่อวิชา: {item.name}</Text>
                            <Text style={styles.title}>รหัสวิชา: {item.id == "" ? "" : item.id }</Text>
                          </View>
                          
                        </View>
                    </View>
                    <View>
                      <Text style={styles.descrption}>ภาคการศึกษา: {item.semester} </Text>
                      <Text style={styles.descrption}>เวลาเช็คชื่อ: {item.startTime} - {item.endTime} </Text>
                      <Text style={styles.descrption}>วันที่: {item.currentDate.split('-')[2] +'/'+ item.currentDate.split('-')[1] +'/'+ item.currentDate.split('-')[0] } </Text>
                      <Text style={styles.descrption}>คำอธิบาย: {item.desc == "" ? "(ไม่ได้ระบุไว้)" : item.desc} </Text>
                      <Text style={styles.descrption}>รูปแบบการเช็คชื่อ: {item.isLocationSet ? 'ระบุสถานที่' : 'ออนไลน์'} </Text>
                    </View>
                    
              </View>
              

              {
                item.isStudentAdded ?
                <View style={{flexDirection:'column',margin:15}}>
                    <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-around'}}>
                          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                              <Icon name="users" size={23} />
                              <Text style={styles.statText} >  {item.totalStudent}</Text>
                          </View>
                          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                              <Icon name="check" size={30} color='green'/>
                              <Text style={styles.statText}>  {item.checkedStudent}</Text>
                          </View>
                          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                              <Icon name="times" size={30} color='red'/>
                              <Text style={styles.statText}>  {item.uncheckedStudent}</Text>
                          </View>
                      </View>
                      <View style={{marginTop:15}}>
                        <View style={{backgroundColor:'#9E76B4',padding:12,elevation:2,borderRadius:20,alignSelf:'center'}}>
                          <TouchableOpacity onPress={() => { navigation.navigate('RoomStat',{uqID:item.uqID,selectedDate:selectedDate})}} >
                            <View style={{flexDirection:'row'}}>
                              <Icon name="pie-chart" size={25} color="white" /> 
                              <Text style={{color:'white',marginLeft:7}}>สถิติการเข้าห้อง</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        { item.isSeatmapSet ?
                        <View style={{backgroundColor:'#9E76B4',padding:12,elevation:2,borderRadius:20,marginTop:15,alignSelf:'center'}}>
                          <TouchableOpacity onPress={() => navigation.navigate('TeacherSeatmap',{uqID:item.uqID,selectedDate:selectedDate})} >
                            <View style={{flexDirection:'row'}}>
                              <Icon name="users" size={23} color="white" />
                              <Text style={{color:'white',marginLeft:7}}>แผนผังที่นั่ง</Text>
                            </View>
                          </TouchableOpacity>
                      </View>
                      :
                      <></>
                      }
                    </View>
                    
                  
                  </View> 
                :
                // <View style={{flexDirection:'row',alignSelf:'center',margin:15}}>
                //   <TouchableOpacity style={styles.addStudentWarningButton}>
                //     <Text style={{color:'red'}}>กรุณาเพิ่มรายชื่อนักศึกษา</Text>
                //   </TouchableOpacity>
                // </View> 
                <></>



              }

            {
              item.isLocationSet ?
              <View style={{backgroundColor:'#9E76B4',padding:12,elevation:2,borderRadius:20,alignSelf:'center'}}>
                <TouchableOpacity onPress={async () => {
                    await updateWifiLocAPI(item.uqID,teacherIDState)
                }}  >
                  <View style={{flexDirection:'row'}}>
                    <Icon name="map-marker" size={25} color="white" /> 
                    <Text style={{color:'white',marginLeft:7}}>อัปเดตสถานที่เช็คชื่อ</Text>      
                  </View>
                </TouchableOpacity>
               
            </View>
            :
            <></>
            }
            
            {
              item.isStudentAdded ?
              <View >
                <TouchableOpacity style={{backgroundColor:'red',padding:15,elevation:2,borderRadius:25,alignSelf:'center',marginTop:15}}
                onPress={async () => {
                  var localTime = moment(new Date()).format('HH:mm').toString()
                  var localDate = moment(new Date()).format('YYYY-MM-DD').toString()
                  await _cancelSession(item.currentDate,item.uqID)
                  await _fetchSessionsAPI(item.currentDate,localTime,localDate)
                  }} >
                  <Text style={{color:'white'}}>ยกเลิกการเช็คชื่อ</Text>
                </TouchableOpacity>
              </View>
              :
              <></>
            }
            
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
            
            
            </View>


            
            
            
                
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


        const HeaderFlatlistComponent = ()=>{
          var myDateSplit = selectedDate.split("-")
          const myDate = myDateSplit[2]+'/'+myDateSplit[1]+'/'+myDateSplit[0]
          return(
            < >
                {/* <Text style={{alignSelf:'center'}}>Date: {selectedDate}</Text>
                <Text style={{alignSelf:'center'}}>TeacherID: {teacherIDState}</Text>
                <Text style={{alignSelf:'center'}}>Time: {localTime}</Text> */}
                {/* <Calendar 
                style={{margin:20 , padding:20 , borderRadius:20 , elevation:5 , marginTop:30}}
                onDayPress={async day => {
                  var localTime = moment(new Date()).format('HH:mm').toString()
                  var localDate = moment(new Date()).format('YYYY-MM-DD').toString()
                  var selectDate = day.dateString
                  console.log(selectDate);
                  setSelectedDate(selectDate)
                  await _fetchSessionsAPI(selectDate,localTime,localDate)
                  }}
                  
                /> */}
                <View style={{backgroundColor:'white',elevation:2,margin:15,borderRadius:20,padding:15}}>
                    <CalendarPicker
                    width={360}
                    height={360}
                    selectedDayColor="#9E76B4"
                    // todayBackgroundColor="#7fff00"
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

               
                

                <View style={{alignItems:'center',marginBottom:8}}>     
                 <TouchableOpacity  style={{alignItems:'center',backgroundColor:'white',padding:15,borderRadius:20,elevation:2}} onPress={() => navigation.navigate('TeacherCreateRoom')}>
                
                    <Icon name="plus-circle" size={50}/>
                    <Text >เพิ่มห้องเช็คชื่อ</Text>
                 </TouchableOpacity>
                 </View>  
                 <Text style={{alignSelf:'center'}}>การเช็คชื่อของวันที่ {myDate} ({localTime})</Text>     
                      
               
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
                    ListHeaderComponent={HeaderFlatlistComponent()}
                />
                
                <Modal
                animationType="fade"
                transparent={true}
                visible={isInprogressModalShow}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={{backgroundColor:'white',alignItems:'center',justifyContent:'center',flex:1,marginLeft:20,marginRight:20,marginTop:220,borderRadius:20,elevation:2,marginBottom:190}}>
                    <View style={{marginTop:50}}>
                      <Text style={{fontSize:20}}>กำลังอัปเดตสถานที่</Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center'}}>
                      <ActivityIndicator size={200} color="#9E76B4" />
                    </View>
                </View>
              </Modal>
             
            </SafeAreaView>
        </>
     );

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
  else
  {
    background = 'red'
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
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius:20,
      elevation:2,
    },
    title: {
      fontSize: 19,
    },
    descrption:{
        fontSize:13
    },
    addStudentWarningButton : {
      backgroundColor:'yellow',
      padding:10,
      borderRadius:10,
      borderColor:'red',
      borderWidth:3
    },
    statText: {
      fontSize:15
    },
    statusText: {
      color:'white'
    }
  });

export default TeacherHome