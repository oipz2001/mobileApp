import React,{useState} from 'react'
import { Button, View,Text,StyleSheet,Platform,TouchableOpacity  } from 'react-native'
import {Picker} from '@react-native-community/picker'
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInput from '../../components/TextInput'
import DateTimePicker from '@react-native-community/datetimepicker';
const moment = require('moment')
import CheckBox from '@react-native-community/checkbox'
import { ScrollView } from 'react-native-gesture-handler';

const TeacherSessionCreate = ({navigation}) => {
    //Term and Year
    const [selectedTermValue, setSelectedTermValue] = useState("1");
    const [selectedYearValue,setSelectedYearValue] = useState("2563");

    //Date Peroid

        //Date default
    const [date_start,setDate_start] = useState(new Date())
    const [date_end,setDate_end] = useState(new Date())
        //Date Setected
    const [selectedMonthStart,setSelectedMonthStart] = useState(moment(new Date()).format('DD-MM-YYYY').toString())
    const [selectedMonthEnd,setSelectedMonthEnd] = useState(moment(new Date()).format('DD-MM-YYYY').toString())
        //Show Date Picker
    const [showDatePicker_start,setShowDatePicker_start] = useState(false)
    const [showDatePicker_end,setShowDatePicker_end] = useState(false)


    //Sessions Time

        //Time default
    const [time_start, setTime_start] = useState(new Date());
    const [time_end, setTime_end] = useState(new Date());
        //Show Time Picker
    const [showTimePicker_start, setShowTimePicker_start] = useState(false);
    const [showTimePicker_end, setShowTimePicker_end] = useState(false);
        //Time Selected
    const [selectedTime_start,setSelectedTime_start] = useState(moment(new Date()).format('HH:mm').toString());
    const [selectedTime_end,setSelectedTime_end] = useState(moment(new Date()).format('HH:mm').toString());


    // Duplicate Day
    const [isMon, setIsMon] = useState(false);
    const [isTue, setIsTue] = useState(false);
    const [isWed, setIsWed] = useState(false);
    const [isThu, setIsThu] = useState(false);
    const [isFri, setIsFri] = useState(false);
    const [isSat, setIsSat] = useState(false);
    const [isSun, setIsSun] = useState(false);

    //Change Session Time Start
    const onChange_TimeStart = (event, selectedTime) => {
        setShowTimePicker_start(false)
        // const currentTime = selectedTime || time_start;
        setSelectedTime_start(moment(selectedTime).format('HH:mm').toString())
    
    
  };
    //Change Session Time End
    const onChange_TimeEnd = (event, selectedTime) => {
        setShowTimePicker_end(false)
        // const currentTime = selectedTime || time_end;
        setSelectedTime_end(moment(selectedTime).format('HH:mm').toString())


    };

    //Change session duplicate date period
        //Date start
    const onChange_DateStart = (event, selectedTime) => {
        setShowDatePicker_start(false)
        // const currentTime = selectedTime || time_end;
        setSelectedMonthStart(moment(selectedTime).format('DD-MM-YYYY').toString())
        


    };
        //Date end
    const onChange_DateEnd = (event, selectedTime) => {
        setShowDatePicker_end(false)
        // const currentTime = selectedTime || time_end;
        setSelectedMonthEnd(moment(selectedTime).format('DD-MM-YYYY').toString())
        


    };

 // Set Show Picker
    const _showTimepicker_start = () => {
        setShowTimePicker_start(true);
        
    };

    const _showTimepicker_end = () => {
        setShowTimePicker_end(true);
        
    };

    const _showDatePicker_start = () => {
        setShowDatePicker_start(true)
    }

    const _showDatePicker_end = () => {
        setShowDatePicker_end(true)
    }





    

    

    

    

    const DupDayComponent = () => {
        return(
        <View style={{padding:10,borderRadius:20,backgroundColor:'#e6e6fa',elevation:7}} >
            <View style={{flexDirection:'row'}} >
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox value={isMon} onValueChange={setIsMon} />
                    <Text>Mon</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox value={isTue} onValueChange={setIsTue} />
                    <Text>Tue</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox value={isWed} onValueChange={setIsWed}/>
                    <Text>Wed</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox value={isThu} onValueChange={setIsThu} />
                    <Text>Thu</Text>
                </View>
            </View>
          <View style={{flexDirection:'row',justifyContent:'center'}} >
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox value={isFri} onValueChange={setIsFri} />
                    <Text>Fri</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox value={isSat} onValueChange={setIsSat} />
                    <Text>Sat</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CheckBox value={isSun} onValueChange={setIsSun}/>
                    <Text>Sun</Text>
                </View>
            </View>
        </View>
        )
    }

    

    return(
        <>
        
                
                <SafeAreaView style={{flex:1}}>
                
                <View style={{backgroundColor:'white',margin:14,padding:30,borderRadius:20,elevation:7,paddingBottom:20}}>
                <View style={{alignItems:'center'}}>
                <View style={{flexDirection:'column',justifyContent:'space-between'}} >
                <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#9E76B4',paddingLeft:15,borderRadius:20,elevation:7}}>
                    <Text style={{fontSize:20,color:'white'}}>Semester</Text>
                     <Picker
                        selectedValue={selectedTermValue}
                        style={{ height: 39, width: 80,color:'white'}}
                        onValueChange={(itemValue, itemIndex) => {setSelectedTermValue(itemValue)}}
                    >
                        <Picker.Item label="1" value="1"  />
                        <Picker.Item label="2" value="2" />
                    </Picker>
                </View>
                </View>

                

                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <View>
                            <Text style={styles.title}>Start date</Text>
                            
                            <TouchableOpacity onPress={_showDatePicker_start}  style={styles.picker}>
                                <Text style={{color:'white'}}>{selectedMonthStart}</Text>
                            </TouchableOpacity>
                            
                        </View>
                        <View>
                            <Text style={styles.title}>End date</Text>
                            <TouchableOpacity onPress={_showDatePicker_end}  style={styles.picker}>
                                <Text style={{color:'white'}}>{selectedMonthEnd}</Text>
                            </TouchableOpacity>
                        </View>

                        
                </View>
                    <Text style={styles.title}>Session ID</Text>
                    <TextInput placeholder='261434'/>
                    <Text style={styles.title}>Session Name</Text>
                    <TextInput placeholder='Network'/>
                    <Text style={styles.title}>Description</Text>
                    <TextInput placeholder='Room 516 CPE Building'/>
                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <View>
                            <Text style={styles.title}>Start time</Text>
                            
                            <TouchableOpacity onPress={_showTimepicker_start}  style={styles.picker}>
                                <Text style={{color:'white'}}>{selectedTime_start}</Text>
                            </TouchableOpacity>
                            
                        </View>
                        <View>
                            <Text style={styles.title}>End time</Text>
                            <TouchableOpacity onPress={_showTimepicker_end}  style={styles.picker}>
                                <Text style={{color:'white'}}>{selectedTime_end}</Text>
                            </TouchableOpacity>
                        </View>

                        
                    </View>
                    
                    <View style={{alignItems:'center'}}>
                        <Text style={styles.title}>Duplicate days </Text>
                        <DupDayComponent/>
                    </View>

                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('TeacherSettingLocation')} style={{backgroundColor:'#9E76B4',padding:10,marginTop:20,elevation:7,borderRadius:30}}>
                            <Text style={{fontSize:20,color:'white'}}>Continue </Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                    
                    
                    
                </View>
                

                {showTimePicker_start && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={time_start}
                             mode='time'
                            is24Hour={true}
                            display="default"
                             onChange={onChange_TimeStart}
                        />
                    )}

                    {showTimePicker_end && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={time_end}
                             mode='time'
                            is24Hour={true}
                            display="default"
                             onChange={onChange_TimeEnd}
                        />
                    )}

                    {showDatePicker_start && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date_start}
                             mode='date'
                            display="default"
                             onChange={onChange_DateStart}
                        />
                    )}

                    {showDatePicker_end && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date_end}
                             mode='date'
                            display="default"
                             onChange={onChange_DateEnd}
                        />
                    )}
                
                
                
                
                </SafeAreaView>

        </>
            
        
        
        
        

    );

}



const styles = StyleSheet.create({
    title:{
        fontSize:20
    },
    picker:{
        backgroundColor:'#9E76B4',
        borderRadius:20,
        padding:7,
        elevation:10,
        alignItems:'center'
    }
  });

export default TeacherSessionCreate