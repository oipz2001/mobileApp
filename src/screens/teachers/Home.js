import React,{useEffect, useState} from 'react'
import { Button, View,Text,StyleSheet,FlatList,StatusBar,TouchableOpacity,Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Calendar from '../../components/CalendarPicker'
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'

const moment = require('moment')
const TeacherHome = ({ navigation }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [selectedDate,setSelectedDate] = useState(moment(new Date()).format('DD-MM-YYYY').toString())

    const [sessionsData,setSessionsData] = useState(null)

    const DATA = [
      {
        id: "111111",
        title: "Calculas1",
        time:"13:00-14.30",
        desc: "Room 516 Math Building",
        all:100,
        present:80,
        absent:20,
        isStudentAdded:true
      },
      {
        id: "222222",
        title: "Calculas2",
        time:"11:00-12.30",
        desc: "Room 517 Math Building",
        all:1000,
        present:750,
        absent:250,
        isStudentAdded:false
      },
      {
        id: "333333",
        title: "Calculas3",
        time:"8:00-9:30",
        desc: "Room 588 Math Building",
        all:21,
        present:17,
        absent:4,
        isStudentAdded:true
  
      },
      {
        id: "333444",
        title: "Calculas8",
        time:"8:00-9:30",
        desc: "Room 588 Math Building",
        all:21,
        present:17,
        absent:4,
        isStudentAdded:false
  
      }
    ];

    useFocusEffect(
      React.useCallback(() => {
        // Do something when the screen is focused
        console.log("Home is focused");
        var currentDate =moment(new Date()).format('DD-MM-YYYY').toString()
        _fetchSessionsAPI(currentDate)
  
        return () => {
          // Do something when the screen is unfocused
          // Useful for cleanup functions
          console.log("Home is unfocused");
        };
      }, [])
    );


    const _fetchSessionsAPI = async (selectDate) => {
      var teacherID = '600610749'
      var date  = selectDate
      // https://us-central1-studentchecking.cloudfunctions.net/checkapp
      // http://192.168.0.100:5000/studentchecking/us-central1/checkapp
      await fetch('https://us-central1-studentchecking.cloudfunctions.net/checkapp/mobileApp/getSession?date='+date+'&teacherID='+teacherID)
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
      var teacherID = '600610749'
      console.log(uqID);
      await fetch('https://us-central1-studentchecking.cloudfunctions.net/checkapp/webApp/addNewStudents', {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          uqID: uqID,
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
    }


    // useEffect(() => {
    //   console.log('Test');
    // })

    

    const renderItem = ({ item }) => {
        const Item = ({ item, onPress, style }) => (
            
            <TouchableOpacity   style={[styles.item, style]}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View >
                        <View style={{flexDirection:'row'}}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={{fontSize:16,alignSelf:'center'}}>  ({item.id})</Text>
                        </View>
                        <Text style={styles.descrption} >Time: {item.startTime} - {item.endTime} </Text>
                        <Text style={styles.descrption}>Description: {item.desc} </Text>
                    </View>
                    <View style={{justifyContent:'space-between'}}>
                        <Text>Closed</Text>
                    </View>
              </View>
              
              {/* {
                item.isClassAccept ? 
                (item.isStudentAdded ? 
                // isClassAccept = T , isStudentAdded = T
                <View style={{flexDirection:'column',margin:15}}>
                  <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-around'}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Icon name="users" size={20} />
                            <Text>  {item.all} </Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Icon name="check" size={25} color='green'/>
                            <Text>  {item.present}</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Icon name="times" size={25} color='red'/>
                            <Text>  {item.absent}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',marginTop:15}}>
                      <View style={{backgroundColor:'#9E76B4',padding:12,elevation:7,borderRadius:20}}>
                      <TouchableOpacity onPress={() => { navigation.navigate('RoomStat',{sessionTitle:item.title,sessionID:item.id})}} >
                          <Text style={{color:'white'}}>Statistics</Text>
                      </TouchableOpacity>
                      </View>
                      <View style={{backgroundColor:'#9E76B4',padding:12,elevation:7,borderRadius:20}}>
                      <TouchableOpacity onPress={() => navigation.navigate('TeacherSeatmap',{sessionTitle:item.title,sessionID:item.id})} >
                          <Text style={{color:'white'}}>Seat map</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                
              </View> 
                :  
                // isClassAccept = T , isStudentAdded = F
                <View style={{flexDirection:'row',alignSelf:'center',margin:15}}>
                  <TouchableOpacity style={{backgroundColor:'yellow',padding:10,borderRadius:10}}>
                    <Text style={{color:'red'}}>Please add your students</Text>
                  </TouchableOpacity>
                </View> 
                ) 
                :  
                // isClassAccept = F
                <View style={{flexDirection:'row',justifyContent:'space-evenly',margin:15}}>
                  <TouchableOpacity style={{backgroundColor:'green',padding:15,elevation:5,borderRadius:20}}>
                    <Text style={{color:'white'}}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{backgroundColor:'red',padding:15,elevation:5,borderRadius:20}}>
                    <Text style={{color:'white'}}>Cancel</Text>
                  </TouchableOpacity>
                </View>

                

              } */}

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
                        <TouchableOpacity onPress={() => { navigation.navigate('RoomStat',{sessionTitle:item.title,sessionID:item.id,uqID:item.uqID})}} >
                            <Text style={{color:'white'}}>Statistics</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{backgroundColor:'#9E76B4',padding:12,elevation:7,borderRadius:20}}>
                        <TouchableOpacity onPress={() => navigation.navigate('TeacherSeatmap',{sessionTitle:item.title,sessionID:item.id,uqID:item.uqID})} >
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
                <TouchableOpacity  >
                  <View style={{flexDirection:'row'}}>
                    <Icon name="map-marker" size={25} color="white" /> 
                    <Text style={{color:'white',marginLeft:7}}>Update location</Text>      
                  </View>
                </TouchableOpacity>
                
            
                
                
            </View>

            <View>
                <TouchableOpacity style={{backgroundColor:'red',padding:15,elevation:5,borderRadius:25,alignSelf:'center',marginTop:15}}>
                      <Text style={{color:'white'}}>Cancel</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={{backgroundColor:'green',padding:15,elevation:5,borderRadius:25,alignSelf:'center',marginTop:15}}
                onPress={() => {
                  _addStudentTestAPI(item.uqID)
                  _fetchSessionsAPI(selectedDate)
                  }} >
                      <Text style={{color:'white'}}>Test Add Students</Text>
                </TouchableOpacity>
            </View>
            
            
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
                <Calendar 
                style={{margin:20 , padding:20 , borderRadius:20 , elevation:5 , marginTop:30}}
                onDayPress={async day => {
                  var selectDate = day.day+'-'+day.month+'-'+day.year
                  console.log(selectDate);
                  setSelectedDate(selectDate)
                  await _fetchSessionsAPI(selectDate)

                  
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
                    keyExtractor={(item) => item.id}
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