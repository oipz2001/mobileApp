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

  const [isInfoShow,setInfoShow] = useState(false)

  useEffect(() => {
    console.log("test");
    AsyncStorage.setItem('uniqueID','600610749')
  },[])


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
      setInfoShow(true)
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
        setInfoShow(false)
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
      if (value !== null) 
        console.log(value);
      else
      console.log('No data is stored');
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    _retrieveData()
  },[])

  




  return (


    <SafeAreaView style = {{flex: 1, justifyContent: 'center',alignItems: 'center'}} >
      
    <TouchableOpacity onPress={_Login} style={{backgroundColor:'#9E76B4',padding:12,elevation:5,borderRadius:20}}>
      <Text style={{color:'white'}}>Login with CMU</Text>
    </TouchableOpacity>
    {isInfoShow &&
    <View style={{backgroundColor:'#9E76B4',marginTop:30,padding:10,elevation:5,borderRadius:20}}>
      <Text style={{color:"white"}} > Name: {user} </Text> 
      <Text style={{color:"white"}} > Mail: {mail} </Text> 
      <Text style={{color:"white"}} > ID: {userId} </Text> 
      <Text style={{color:"white"}} > JobTitle: {jobtitle} </Text>
      {/* <Text style={{color:"white"}} > JobTitle: Student </Text> */}
    </View>
    }
    
    <TouchableOpacity onPress={_onLogout} style={{backgroundColor:'#9E76B4',padding:12,elevation:5,borderRadius:20,marginTop:30}}>
      <Text style={{color:'white'}}>Logout</Text>
    </TouchableOpacity> 
    <View >
      <View style = {{marginTop: 30}} >
        <Button title = "Go to Teacher Home" onPress = {() => navigation.navigate('TeacherHome')}/> 
      </View> 
      <View style = {{marginTop: 30 }} >
        <Button title = "Go to Student Home" onPress = {() => navigation.navigate('StudentHome')}/> 
      </View> 
    </View>
    </SafeAreaView>
  );

}

export default Login