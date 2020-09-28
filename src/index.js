
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
// import 

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>This is Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details',{
//             itemId: 86,
//             otherParam: 'anything you want here',
//           })}
//       />
//     </View>
//   );
// }
// function DetailsScreen({ route,navigation }) {
//     const { itemId } = route.params;
//     const { otherParam } = route.params;
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Details Screen</Text>
//         <Text>itemId: {JSON.stringify(itemId)}</Text>
//         <Text>otherParam: {JSON.stringify(otherParam)}</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() =>
//           navigation.push('Details', {
//             itemId: Math.floor(Math.random() * 100),
//           })
//         }
//       />
//         <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//         <Button title="Go back" onPress={() => navigation.goBack()} />
//         <Button
//         title="Go back to first screen in stack"
//         onPress={() => navigation.popToTop()}
//         />
//       </View>
//     );
//   }

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={TeacherHome} 
//             options={{ 
//                 title: 'Home Screen' , 
//                 headerTitleAlign:'center' ,
//                 headerStyle: { backgroundColor: '#9E76B4'} ,
//                 headerTintColor: '#fff',
//                 headerTitleStyle: {
//                     fontWeight: 'bold',
//                     fontFamily : 'normal'
                    
//                   }
//             }}  />
//         <Stack.Screen name="Details" component={DetailsScreen}
//             options={{ 
//                 title: 'Details Screen' , 
//                 headerTitleAlign:'center' ,
//                 headerStyle: { backgroundColor: '#4169e1'} ,
//                 headerTintColor: '#fff'
//         }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

const Stack = createStackNavigator();

const NavigatorScreens = () =>{
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={Login} /> 
        <Stack.Screen name="TeacherHome" component={TeacherHome} />
        <Stack.Screen name="TeacherCreateRoom" component={TeacherSessionCreate} />
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