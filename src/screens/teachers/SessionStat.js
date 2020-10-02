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

    useEffect(() => {
        console.log(route.params);
    })

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
    const facultyData = [
        {
          name: "Engineering",
          population: 100,
          color: "#00008b",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Education",
          population: 30,
          color: "#6495ed",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Humanities",
          population: 40,
          color: "#ff8c00",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Science",
          population: 25,
          color: "#ff00ff",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Economics",
          population: 12,
          color: "#adff2f",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }
      ];
    
      const presentData = [
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
      ];
      const StudentDATA = [
        {
            id: "600610748",
            name: "Pathomporn Pinkeaw",
            status:'unchecked',
            faculty:'Engineering'
        },
        {
          id: "600610749",
          name: "Parinya Seetawan",
          status:'checked',
          faculty:'Engineering'
        },
        {
          id: "600610750",
          name: "Parinyakorn Something",
          status:'checked',
          faculty:'Economics'
        },
        {
          id: "600610751",
          name: "Pawaris Suaaim",
          status:'unchecked',
          faculty:'Science'
        },
      ];
      const Item = ({ item, onPress, style }) => (
      
        
        <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View>
              <Text style={styles.id}>{item.id}</Text>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.faculty}>{item.faculty}</Text>
                </View>
                <View style={{flexDirection:'column',justifyContent:'flex-end'}}>
                {item.status == 'checked' ?
                <View>
                <Image source={require('../../assets/vectors/check.png')} style={{width:25,height:25}} />
                <Text>14:35</Text>
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
                <Text style={{fontSize:20}}>Statatistics</Text>
               <PieChart
                    data={presentData}
                    width={375}
                    height={250}
                    chartConfig={chartConfig}
                    accessor="population"
                    paddingLeft="15"
                    style={{ borderRadius:20,elevation:5,backgroundColor:"white"}}
                />
            </View>

            <View style={{marginTop:20,alignItems:'center',marginBottom:30}}>
                <Text style={{fontSize:20}}>Faculty</Text>
                <PieChart
                    data={facultyData}
                    width={375}
                    height={250}
                    chartConfig={chartConfig}
                    accessor="population"
                    paddingLeft="15"
                    style={{ borderRadius:20,elevation:5,backgroundColor:"white"}}
                    absolute
                />
            </View >
            <View>
                <Text style={{fontSize:20,alignSelf:'center'}}>Student List</Text>
            </View>
            
            </>
        )
    }

      
      
     
    return(
        <>
        
                
                <SafeAreaView style={{flex:1,alignItems:'center'}}>
                
                <FlatList
                    data={StudentDATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
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