
import * as React from 'react';
import { View, Text,Button } from 'react-native';
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
import StudentReport from './screens/students/Report'
import SettingLocation from './screens/teachers/settingLoc'


const Stack = createStackNavigator();

const NavigatorScreens = () =>{
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >

        <Stack.Screen name="Login" component={Login} /> 
        <Stack.Screen name="TeacherHome" component={TeacherHome} />
        <Stack.Screen name="TeacherCreateRoom" component={TeacherSessionCreate} />
        <Stack.Screen name="TeacherSettingLocation" component={SettingLocation} />
        <Stack.Screen name="RoomStat" component={TeacherSessionStat} />

        <Stack.Screen name="StudentHome" component={StudentHome}/>
        <Stack.Screen name="StudentFaceCheckIn" component={StudentFaceCheckIn}/>
        <Stack.Screen name="InClass" component={InClass}/>
        <Stack.Screen name="ScanQR" component={ScanQR}/>
        <Stack.Screen name="MyQR" component={MyQR}/>
        <Stack.Screen name="Report" component={StudentReport}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  )

}

export default NavigatorScreens