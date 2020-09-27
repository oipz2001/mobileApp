import React, { useState,Component } from 'react';
import { View,Image,Text,SafeAreaView,TouchableHighlight, Button } from 'react-native';
import WifiPresent from './src/screens/wifiPresent'
import Camera from './src/screens/cameraTest'
import Login from './src/screens/Login'
import Calendar from './src/components/CalendarPicker'
import MyAppNavigator from './src/index'
import TeacherHome from './src/screens/teachers/Home'
import StudentHome from './src/screens/students/Home'
import InClassRoom from './src/screens/students/InClassroom'
import CheckInCamera from './src/screens/students/faceCheckInCamera'

const App = () => {
  
    
    return(
    // <WifiPresent />
    // <Camera />
    // <Login />
    
    // <Calendar/>
    <MyAppNavigator/>
    // <TeacherHome />
    // <StudentHome/>
    // <InClassRoom/>
    // <CheckInCamera/>
    
    
    );
    
    
  
}
export default App








