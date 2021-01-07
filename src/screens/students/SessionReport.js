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
        
        return(
        
        <View style={styles.item}>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.title}>{item.date}</Text>
                {
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
                <SafeAreaView style={{flex:1}}>
                <View style={{marginTop:30,padding:15}}>
            <Text style={{fontSize:25,alignSelf:'center'}}>{route.params.className} ({route.params.classID})</Text>
                <FlatList
                    data={reportData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                </View>
                
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
      elevation:7,
      borderRadius:20,
      backgroundColor:'white'
    },
    title: {
      fontSize: 20,
    },
  });

export default SessionReport