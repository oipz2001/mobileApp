import React, {
  useState,useEffect
} from 'react'
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import TextInput from '../components/TextInput'
import AzureAuth from 'react-native-azure-auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

const azureAuth = new AzureAuth({
  clientId: '234c43b9-e653-4646-97c6-1903cfac1c03'
});





const Login = ({navigation}) => {
  const [accessToken, setaccessToken] = useState('')
  const [user, setuser] = useState('')
  const [mail, setmail] = useState('')
  const [userId, setuserId] = useState('')
  const [jobtitle, setjobtitle] = useState('')


  const _Login = async () => {
    try {
      let tokens = await azureAuth.webAuth.authorize({
        scope: 'openid profile User.Read Mail.Read'
      })
      let info = await azureAuth.auth.msGraphRequest({
        token: tokens.accessToken,
        path: '/me'
      })
      // console.log(tokens.expireOn);
      AsyncStorage.setItem('name',info.displayName);
      AsyncStorage.setItem('mail',info.mail);
      AsyncStorage.setItem('id',info.id);
      AsyncStorage.setItem('jobtitle',info.jobTitle);
      setuser(info.displayName);
      setmail(info.mail)
      setuserId(info.id)
      setjobtitle(info.jobTitle)
    } catch (error) {
      console.log(error)
    }
  }

  const _onLogout = () => {
    azureAuth.webAuth
      .clearSession()
      .then(success => {
        setaccessToken(null)
        setuser(null)
        setmail(null)
        setuserId(null)
        setjobtitle(null)
        AsyncStorage.removeItem('name')
        AsyncStorage.removeItem('mail')
        AsyncStorage.removeItem('id')
        AsyncStorage.removeItem('jobtitle')
      })
      .catch(error => console.log(error));
  };

  const _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'name',
        'Parinya'
      );
    } catch (error) {
      // Error saving data
    }
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('name');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    _retrieveData()
  })

  




  return (


    <SafeAreaView style = {{flex: 1, justifyContent: 'center',alignItems: 'center'}} >
    {/* <Button title = "LOGIN" onPress = {_Login}/> */}
    <TouchableOpacity onPress={_Login} style={{backgroundColor:'#9E76B4',padding:12,elevation:5,borderRadius:20}}>
      <Text style={{color:'white'}}>Login with CMU</Text>
    </TouchableOpacity>

    <Text > Name: {user} </Text> 
    <Text> Mail: {mail} </Text> 
    <Text> ID: {userId} </Text> 
    <Text> JobTitle: {jobtitle} </Text>

    <Button title = "LOGOUT" onPress = {_onLogout}/> 
    <View style = {{marginTop: 30}} >
    <Button title = "Go to Teacher Home" onPress = {() => navigation.navigate('TeacherHome')}/> 
    </View> 
    <View style = {{marginTop: 30 }} >
    <Button title = "Go to Student Home" onPress = {() => navigation.navigate('StudentHome')}/> 
    </View> 
    </SafeAreaView>
  );

}

export default Login