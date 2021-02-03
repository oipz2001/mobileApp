import React,{useState,useEffect} from 'react'
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity,View,Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';



const URL = require('../../config/endpointConfig')

const myEndpointURL =  URL.myEndpointStudent



const SessionReport = ({route}) => {
    
      const [reportData,setReportData] = useState([])

      useEffect(() => {
        console.log(route.params);

        const classReportAPI = async (uqID,teacherID,studentID) => {
          await fetch(myEndpointURL+'/classReport', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              uqID: uqID,
              teacherID:teacherID,
              studentID:studentID
    
            })
            })
            .then((response) => response.json())
            .then((data) => {
                
                console.log(data);
                setReportData(data)
            })
            .catch((error) => {
            console.error(error);
            });
        }
        

        
        classReportAPI(route.params.uqID,route.params.teacherID,route.params.studentID)

        
      },[])


     


    
      const Item = ({ item }) => {
        const myDateSplit = item.date.split('-')
        const day = myDateSplit[2]
        const month = myDateSplit[1]
        const year = myDateSplit[0]
        
        return(
        
        <View style={styles.item}>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.title}>{day+'/'+month+'/'+year}</Text>
                {
                  (item.classStatus == -1) ?
                  <View>
                    <Text style={{color:'orange'}}>Waiting</Text>
                  </View>
                  :
                  item.isChecked ?
                  <View style={{flexDirection:'row'}}>
                    <Image source={require('../../assets/vectors/check.png')} style={{width:25,height:25}} />
                  <Text>{item.timestamp}</Text>
                  </View>
                  :
                  <Image source={require('../../assets/vectors/close.png')} style={{width:25,height:25}} />
                }
                
           </View>
          
        </View>
        
      )};

      const renderItem = ({ item }) => (
        <Item item={item} />
      );

      
      

    return(
        <>
                <SafeAreaView style={{flex:1,padding:10}}>
                
            
                <FlatList
                    data={reportData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={<Text style={{fontSize:18,alignSelf:'center'}}>
                      สรุปผลการเช็คชื่อห้อง {route.params.className} 
                      {route.params.classID == "" ? "" : `(${route.params.classID})`}</Text>}
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
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 10,
      marginHorizontal: 16,
      elevation:2,
      borderRadius:20,
      backgroundColor:'white'
    },
    title: {
      fontSize: 20,
    },
  });

export default SessionReport