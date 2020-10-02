import React,{useState} from 'react'
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity,View,Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';






const SessionReport = () => {
    const DATA = [
        {
          id: "0",
          title: "1/9/63",
        },
        {
          id: "1",
          title: "7/9/63",
        },
        {
          id: "2",
          title: "14/9/63",
        },
        {
            id: "3",
            title: "21/9/63",
        },
        {
            id: "4",
            title: "25/9/63",
        },
        {
            id: "5",
            title: "1/10/63",
        },
      ];
    
      const Item = ({ item }) => (
        <View style={styles.item}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={styles.title}>{item.title}</Text>
                <Image source={require('../../assets/vectors/check.png')} style={{width:25,height:25}} />
           </View>
        </View>
      );

      const renderItem = ({ item }) => (
        <Item item={item} />
      );
      

    return(
        <>
                <SafeAreaView style={{flex:1}}>
                <View style={{marginTop:30,padding:15}}>
                <Text style={{fontSize:25,alignSelf:'center'}}>261111 Calculus 1</Text>
                <FlatList
                    data={DATA}
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