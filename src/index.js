
import React,{useState} from 'react'
import { View, Text,Button,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TeacherHome from './screens/teachers/Home'
import TeacherSessionCreate from './screens/teachers/SessionCreate'
import TeacherSessionStat from './screens/teachers/SessionStat'
import Login from './screens/Login'
import StudentHome from './screens/students/Home'
import StudentFaceCheckIn from './screens/students/faceCheckInCamera'
import InClass from './screens/students/InClassroom'
import ScanQR from './screens/students/ScanQR'
import MyQR from './screens/students/MyQR'
import StudentReport from './screens/students/SessionReport'
import SettingLocation from './screens/teachers/settingLoc'
import TeacherSeatmap from './screens/teachers/Seatmap'


const Stack = createStackNavigator();

const NavigatorScreens = () =>{
  const [user,setUser] = useState(null)

  const _hearderProfile = () => {
    return(
      <View style={{flexDirection:'row',marginRight:10,justifyContent:'space-around',padding:5}}>
                        <Image source={require('./assets/vectors/user.png')} style={{width:35,height:35}} />
      </View>
    )
  }

  // const forFade = ({ current }) => ({
  //   cardStyle: {
  //     opacity: current.progress,
  //   },
  // });


  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerTitleAlign:'center'}}   >

        <Stack.Screen name="Login" component={Login}  /> 
        <Stack.Screen name="TeacherHome" component={TeacherHome} options={{headerTitle:'My Sessions',headerRight:_hearderProfile}} />
        <Stack.Screen name="TeacherCreateRoom" component={TeacherSessionCreate} options={{headerTitle:'Create Session',headerRight:_hearderProfile}} />
        <Stack.Screen name="TeacherSettingLocation" component={SettingLocation} options={{headerTitle:'Setting Location'}} />
        <Stack.Screen name="RoomStat" component={TeacherSessionStat} options={{headerTitle:'Statistic',headerRight:_hearderProfile}}/>
        <Stack.Screen name="TeacherSeatmap" component={TeacherSeatmap} options={{headerTitle:'Seat map',headerRight:_hearderProfile}}/>

        <Stack.Screen name="StudentHome" component={StudentHome} options={{headerTitle:'My Sessions',headerRight:_hearderProfile}}/>
        <Stack.Screen name="StudentFaceCheckIn" component={StudentFaceCheckIn} options={({route}) => ({headerTitle:'Check-in ('+route.params.sessionTitle+')'})}/>
        <Stack.Screen name="InClass" component={InClass} options={({route}) => ({headerTitle:route.params.sessionTitle,headerRight:_hearderProfile})}/>
        <Stack.Screen name="ScanQR" component={ScanQR} options={{headerRight:_hearderProfile}}/>
        <Stack.Screen name="MyQR" component={MyQR} options={{headerRight:_hearderProfile}}/>
        <Stack.Screen name="SessionReport" component={StudentReport} options={{headerRight:_hearderProfile}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
    
  )

}

export default NavigatorScreens

