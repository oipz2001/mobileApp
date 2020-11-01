import React,{useState} from 'react'
import { Button, View,Text,StyleSheet,StatusBar,FlatList,TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Calendar from '../../components/CalendarPicker'





const StudentHome = ({navigation}) => {
    const DATA = [
        {
            id: "206100",
            title: "Math100",
            time:"13:00-14.30",
            desc: "Room 516 Math Building",
            teacher: "Tommy"
        },
        {
            id: "261458",
            title: "Computer Vision",
            time:"11:00-12.30",
            desc: "Room 516 Math Building",
            teacher: "Tommy"
        },
        {
            id: "261434",
            title: "Network Design",
            time:"8:00-9:30",
            desc: "Room 516 Math Building",
            teacher: "Tommy"
        },
      ];

      
      const Item = ({ item }) => (
        <View style={styles.item}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View >
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={{fontSize:17}}>({item.id})</Text>
                        <Text style={{fontSize:12}}>Time: {item.time} </Text>
                        <Text style={{fontSize:12}}>Teacher: {item.teacher} </Text>
                        <Text style={{fontSize:12}}>Description: {item.desc} </Text>
                    </View>
                    <View style={{justifyContent:'space-between'}}>
                        <Text>(Status)</Text>
                    </View>
            </View>
            <View >
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginTop:15}}>
                  <View style={{backgroundColor:'#9E76B4',padding:12,elevation:7,borderRadius:20}}>
                  <TouchableOpacity onPress={() => navigation.navigate('StudentFaceCheckIn',{sessionTitle:item.title,sessionID:item.id})} >
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
        
                
                <SafeAreaView style={{flex:1,backgroundColor:'#9E76B4'}}>
                
                
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={<Calendar style={{margin:20 , padding:20 , borderRadius:20 , elevation:5 , marginTop:30}} />}
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