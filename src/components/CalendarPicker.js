import React,{useState} from 'react'
import { View,Text,Button,TouchableHighlight,SafeAreaView } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';




const CalendarPicker = () => {

    return(
        
        <SafeAreaView>
            <View>
                <Calendar style={{margin:20 , padding:20 , borderRadius:20 , elevation:5 , marginTop:30}} />
            </View>
        
        </SafeAreaView>
        
        // <CalendarList/>
        
        

    );

}

export default CalendarPicker