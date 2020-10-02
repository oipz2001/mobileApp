import React,{useEffect, useState} from 'react'
import { Button, View,Text,StyleSheet,FlatList,StatusBar,TouchableOpacity,Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Calendar from '../../components/CalendarPicker'

  
  
  

const TeacherHome = ({ navigation }) => {
    const [selectedId, setSelectedId] = useState(null);
    const DATA = [
      {
        id: "111111",
        title: "Calculas1",
        time:"13:00-14.30",
        desc: "Room 516 Math Building",
        all:100,
        present:80,
        absent:20
      },
      {
        id: "222222",
        title: "Calculas2",
        time:"11:00-12.30",
        desc: "Room 517 Math Building",
        all:1000,
        present:750,
        absent:250
      },
      {
        id: "333333",
        title: "Calculas3",
        time:"8:00-9:30",
        desc: "Room 588 Math Building",
        all:21,
        present:17,
        absent:4
  
      },
    ];

    

    const renderItem = ({ item }) => {
        const Item = ({ item, onPress, style }) => (
            
            <TouchableOpacity onPress={() => {
              navigation.navigate('RoomStat',{selectedSessionId:item.id})
              }}  style={[styles.item, style]}>
            <View style={{flexDirection:'column'}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View >
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.descrption} >Time: {item.time} </Text>
                        <Text style={styles.descrption}>Description: {item.desc} </Text>
                    </View>
                    <View style={{justifyContent:'space-between'}}>
                        <Text>Closed</Text>
                    </View>
                    </View>
              <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-around'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Image source={require('../../assets/vectors/multiple-users-silhouette.png')} style={{width:20,height:20}} />
                        <Text>  {item.all} </Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Image source={require('../../assets/vectors/check.png')} style={{width:25,height:25}} />
                        <Text>  {item.present}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Image source={require('../../assets/vectors/close.png')} style={{width:20,height:20}} />
                        <Text>  {item.absent}</Text>
                    </View>
              
              
              
              </View>
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
                
                <Calendar style={{margin:20 , padding:20 , borderRadius:20 , elevation:5 , marginTop:30}} />
                
                
                <View style={{alignItems:'center'}}>     
                 <TouchableOpacity  style={{alignItems:'center',backgroundColor:'white',padding:17,borderRadius:20,elevation:8}} onPress={() => navigation.navigate('TeacherCreateRoom')}>
                    <Image source={require('../../assets/vectors/add-button.png')} style={{width:60,height:60}} />
                    <Text >Add Sessions</Text>
                 </TouchableOpacity>
                 </View>          
                      
               
            </>
          )
      }
      

    return(
        <>
            <SafeAreaView style={{flex:1,backgroundColor:'#9E76B4'}}>
                <FlatList
                    data={DATA}
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