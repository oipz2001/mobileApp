import React, { useState,Component } from 'react';
import { View,Image,Text,SafeAreaView,TouchableHighlight, Button } from 'react-native';
import WifiPresent from './wifiPresent'
import Camera from './src/components/cameraTest'
import Login from './src/screens/Login'
import Calendar from './src/components/CalendarPicker'
import MyAppNavigator from './src/index'
import TeacherHome from './src/screens/teachers/Home'
import StudentHome from './src/screens/students/Home'
import InClassRoom from './src/screens/students/InClassroom'
import CheckInCamera from './src/screens/students/faceCheckInCamera'
import Stat from './src/screens/teachers/SessionStat'
import Create from './src/screens/teachers/SessionCreate'
import CheckBox from './src/components/testCheckedBox'
import WifiTest from './src/screens/teachers/settingLoc'
import ExpoTest from './testExpo'
import TestCamera from './CameraTest'

const App = () => {
  
    
    return(
    // <WifiPresent />
    // <Camera />
    // <Login />
    
    // <Calendar/>
    // <MyAppNavigator/>
    // <TeacherHome />
    // <StudentHome/>
    // <InClassRoom/>
    // <CheckInCamera/>
    // <Stat/>
    // <Create/>
    // <CheckBox/>
    // <WifiTest/>
    // <ExpoTest/>
    <TestCamera/>
    
    
    );
    
    
  
}

export default App