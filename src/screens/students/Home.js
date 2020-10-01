import React,{useState} from 'react'
import { Button, View,Text,StyleSheet,StatusBar,FlatList,TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Calendar from '../../components/CalendarPicker'





const StudentHome = ({navigation}) => {
    const DATA = [
        {
            id: "261123",
            title: "Calculas1",
            time:"13:00-14.30",
            desc: "Room 516 Math Building",
            teacher: "Tommy"
        },
        {
            id: "261321",
            title: "Calculas15",
            time:"11:00-12.30",
            desc: "Room 516 Math Building",
            teacher: "Tommy"
        },
        {
            id: "261999",
            title: "Calculas12",
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
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',marginTop:15}}>
                <View style={{backgroundColor:'#9E76B4',padding:12,elevation:7,borderRadius:20}}>
                <TouchableOpacity onPress={() => navigation.navigate('StudentFaceCheckIn')} >
                    <Text style={{color:'white'}}>Check-In</Text>
                </TouchableOpacity>
                </View>
                <View style={{backgroundColor:'#9E76B4',padding:12,elevation:7,borderRadius:20}}>
                <TouchableOpacity onPress={() => navigation.navigate('InClass')} >
                    <Text style={{color:'white'}}>My Session</Text>
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