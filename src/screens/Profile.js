import React,{useEffect, useState} from 'react'
import { Button, View,Text,StyleSheet,StatusBar,FlatList,TouchableOpacity,Image,ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage'
import {useFocusEffect} from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import storage from '@react-native-firebase/storage';
const MyProfile = () => {
    const [user, setuser] = useState('')
    const [mail, setmail] = useState([])
    const [userId, setuserId] = useState('')
    const [jobtitle, setjobtitle] = useState('')
    const [profilePhoto,setprofilePhoto] = useState('')
    const [teacherIDState,setTeacherIDState] = useState(null)

    const _retrieveData = async () => {
        try {
          const name = await AsyncStorage.getItem('name');
          const id = await AsyncStorage.getItem('id');
          const mail = await AsyncStorage.getItem('mail');
          const jobtitle = await AsyncStorage.getItem('jobtitle');
          if (name !== null) {
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

      const _retrieveUserData = async () => {
        const  teacherID = await AsyncStorage.getItem('uniqueIDStudent');
        const url = await storage().ref(teacherID).getDownloadURL().then(
          function onResolve(foundURL) {
            setprofilePhoto(foundURL)
          }, 
          function onReject(error){ 
              const url_notFound = "https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg"
              setprofilePhoto(url_notFound)
          });
        setTeacherIDState(teacherID)
  
      }

      useEffect(() => {
        _retrieveUserData()
      },[])

    
    return(
        
          <View style={styles.profile}>
            {
              profilePhoto != '' ?
              <Image
                        style={{width:200,height:200}}
                        source={{
                        uri: profilePhoto
                        }}
              />
              :
              <ActivityIndicator size={50} color="#9E76B4" />
               

            }
            
            <Text > Name: {teacherIDState} </Text> 
            <Text> Mail: {mail} </Text> 
            <Text> ID: {userId} </Text> 
            <Text> JobTitle: {jobtitle} </Text>
          </View>
        
        // <WebView source={{ uri: 'https://reactnative.dev/' }} />
    )

}

const styles = StyleSheet.create({
  profile : {
      justifyContent:'center',
      alignItems:'center',
      flex:1
  }
})


export default MyProfile