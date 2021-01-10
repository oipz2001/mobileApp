import React,{useEffect, useState} from 'react'
import { Button, View,Text,StyleSheet,StatusBar,FlatList,TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage'
import {useFocusEffect} from '@react-navigation/native';
import { WebView } from 'react-native-webview';
const MyProfile = () => {
    const [user, setuser] = useState('')
    const [mail, setmail] = useState([])
    const [userId, setuserId] = useState('')
    const [jobtitle, setjobtitle] = useState('')

    const _retrieveData = async () => {
        try {
          const name = await AsyncStorage.getItem('name');
          const id = await AsyncStorage.getItem('id');
          const mail = await AsyncStorage.getItem('mail');
          const jobtitle = await AsyncStorage.getItem('jobtitle');
          if (name !== null) {
            // We have data!!
            console.log(name);
            console.log(id);
            console.log(mail);
            console.log(jobtitle);

            
            setuser(name)
            setmail(id)
            setuserId(mail)
            setjobtitle(jobtitle)

          }
        } catch (error) {
          // Error retrieving data
        }
      };


    // useEffect(() =>{
    //     // _retrieveData()
        
    // },[])

    useFocusEffect(
        React.useCallback(() => {
          // Do something when the screen is focused
          _retrieveData()
    
          return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
          };
        }, [])
      );
    return(
        // <SafeAreaView>
        //     <Text>My profile</Text>
        //     <Text > Name: {user} </Text> 
        //     <Text> Mail: {mail} </Text> 
        //     <Text> ID: {userId} </Text> 
        //     <Text> JobTitle: {jobtitle} </Text>
        // </SafeAreaView>
        <WebView source={{ uri: 'https://reactnative.dev/' }} />
    )

}


export default MyProfile