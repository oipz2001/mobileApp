import React,{useState} from 'react'
import { View,Text,Button,TouchableHighlight,SafeAreaView } from 'react-native';
import TextInput from '../components/TextInput'
import AzureAuth from 'react-native-azure-auth';

const azureAuth = new AzureAuth({
    clientId: '234c43b9-e653-4646-97c6-1903cfac1c03'
});





const Login = ({navigation}) => {
    const [accessToken,setaccessToken] = useState('')
    const [user,setuser] = useState('')
    const [mail,setmail] = useState([])
    const [userId,setuserId] = useState('')
    const [jobtitle,setjobtitle] = useState('')


  const _Login = async () => {
      try {
        let tokens = await azureAuth.webAuth.authorize({scope: 'openid profile User.Read Mail.Read' })
        let info = await azureAuth.auth.msGraphRequest({token: tokens.accessToken, path: '/me'})
        console.log( tokens.expireOn);
        setuser(info.displayName);
        setmail(info.mail)
        setuserId(info.id)
        setjobtitle(info.jobTitle)
      } catch (error) {
        console.log(error)
      }
    } 

  


    return(
        
      
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
          {/* <Button title="LOGIN" onPress={_Login}/>
          
          <Text>Name: {user} </Text>
          <Text>Mail: {mail} </Text>
          <Text>ID: {userId} </Text> */}
          <View >
            <Text style={{fontSize:20}} >Login screen</Text>
          </View>
          <View style={{marginTop:30}} >
            <Button title="Go to Teacher Home" onPress={() => navigation.navigate('TeacherHome') } />
          </View>
          <View style={{marginTop:30}} >
            <Button title="Go to Student Home" onPress={() => navigation.navigate('StudentHome')}  />
          </View>
        </SafeAreaView>
      

    );

}

export default Login



