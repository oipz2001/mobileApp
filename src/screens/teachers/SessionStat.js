import React,{useEffect, useState} from 'react'
import { Button, View,Text,Dimensions,FlatList,TouchableOpacity,StyleSheet,StatusBar,Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import AsyncStorage from '@react-native-community/async-storage'
  const URL = require('../../config/endpointConfig')
  const myEndpointURL =  URL.myEndpointTeacher


  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
const TeacherSessionStat = ({route}) => {
    const [selectedId, setSelectedId] = useState(null);
    const [teacherIDState,setTeacherIDState] = useState(null)
    const [classStatData,setClassStatData] = useState({})
    const [studentStatList,setStudentStatList] = useState([])

    const [chartData,setChartData] = useState(
      [
        {
          name: "Present",
          population: 26,
          color: "green",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Absent",
          population: 5,
          color: "#F00",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }
      ]
    );

    

    useEffect(() => {
      if(teacherIDState != null){
      console.log(route.params.uqID);
      console.log(route.params.selectedDate);
      console.log(teacherIDState);
      classStatAPI(route.params.uqID,route.params.selectedDate,teacherIDState)
    }

  },[teacherIDState])

  useEffect(() => {
    _retrieveUserData()
  },[])

  const _retrieveUserData = async () => {
    const  teacherID = await AsyncStorage.getItem('uniqueIDTeacher');
    setTeacherIDState(teacherID)

  }

  const classStatAPI = async (uqID,selectedDate,teacherID) => {

    await fetch(myEndpointURL+'/getClassStat?uqID='+uqID+'&selectedDate='+selectedDate+'&teacherID='+teacherID)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setClassStatData(data)
            setStudentStatList(data.statistics)

            var myStatChartData = chartData
            myStatChartData[0].population = data.present
            myStatChartData[1].population = data.absent

            setChartData(myStatChartData)

        })
        .catch((error) => {
            console.error(error);
        });
  }
  
 


  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#c0c0c0" : "#fffafa";
    return (
      <Item
        item={item}
        onPress={() => {
            console.log(item.id);
            setSelectedId(item.id)
           
        }}
      />
    );
  };
    
    
      
      
      const Item = ({ item, onPress, style }) => (
      
        
        <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View>
              <Text style={styles.id}>{item.studentUqID}</Text>
              <Text style={styles.name}>{item.studentName}</Text>
                </View>
                <View style={{flexDirection:'column',justifyContent:'flex-end'}}>
                {item.isChecked ?
                <View>
                <Image source={require('../../assets/vectors/check.png')} style={{width:25,height:25}} />
                <Text>{item.timestamp}</Text>
                </View>
                :  
                <Image source={require('../../assets/vectors/close.png')} style={{width:20,height:20}} />
                }

                
                
              </View>
          </View>
        </TouchableOpacity>
        
        );

    const ListHeaderComponent = () => {
        return(
            <>
            <View style={{marginTop:25,alignItems:'center'}}>
            {/* <Text>{JSON.stringify( statData[0]['population'])}</Text> */}
                <Text style={{fontSize:20,marginBottom:10}}>{classStatData.className} ({classStatData.classId})</Text>
               <PieChart
                    data={chartData}
                    width={375}
                    height={250}
                    chartConfig={chartConfig}
                    accessor="population"
                    paddingLeft="15"
                    style={{ borderRadius:20,elevation:5,backgroundColor:"white"}}
                    absolute={true}
                />
            </View>

            <View>
                <Text style={{fontSize:20,alignSelf:'center',marginTop:10}}>Student list</Text>
            </View>
            
            </>
        )
    }

      
      
     
    return(
        <>
        
                
                <SafeAreaView style={{flex:1,alignItems:'center'}}>
                
                <FlatList
                    data={studentStatList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.studentID}
                    extraData={selectedId}
                    ListHeaderComponent={ListHeaderComponent}
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
      backgroundColor:'white'
    },
    name: {
      fontSize: 17,
    },
    id:{
      fontSize: 19 
    },
    faculty:{
      fontSize: 15 
    }
  });

export default TeacherSessionStat