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
    //Month Peroid
    const [selectedMonthStart,setSelectedMonthStart] = useState('1')
    const [selectedMonthEnd,setSelectedMonthEnd] = useState('12')


    //Sessions Time
    const [time_start, setTime_start] = useState(new Date());
    const [time_end, setTime_end] = useState(new Date());

    const [showTimePicker_start, setShowTimePicker_start] = useState(false);
    const [showTimePicker_end, setShowTimePicker_end] = useState(false);

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

    const onChange_start = (event, selectedTime) => {

        const currentTime = selectedTime || time_start;
        setShowTimePicker_start(Platform.OS === 'ios');
        setTime_start(currentTime);
        setSelectedTime_start(moment(currentTime).format('HH:mm').toString())
    
    
  };

    const onChange_end = (event, selectedTime) => {

        const currentTime = selectedTime || time_end;
        setShowTimePicker_end(Platform.OS === 'ios');
        setTime_end(currentTime);
        setSelectedTime_end(moment(currentTime).format('HH:mm').toString())


    };

    const _showTimepicker_start = () => {
        console.log("Test");
        setShowTimePicker_start(true);
        
    };

    const _showTimepicker_end = () => {
        setShowTimePicker_end(true);
        
    };

    

    

    const DupDayComponent = () => {
        return(
            <View style={{padding:10,borderRadius:20,backgroundColor:'#e6e6fa',elevation:7,marginTop:10}} >
                <View style={{flexDirection:'row'}} >
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    
                    <CheckBox
                    value={isMon}
                    onValueChange={setIsMon}
                    />
                    <Text>Mon</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    
                    <CheckBox
                        value={isTue}
                        onValueChange={setIsTue}
                    />
                    <Text>Tue</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    
                    <CheckBox
                    value={isWed}
                    onValueChange={setIsWed}
                    />
                    <Text>Wed</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    
                    <CheckBox
                     value={isThu}
                     onValueChange={setIsThu}
                    />
                    <Text>Thu</Text>
                </View>
            </View>
          <View style={{flexDirection:'row',justifyContent:'center'}} >
            <View style={{flexDirection:'row',alignItems:'center'}}>
            
            <CheckBox
              value={isFri}
              onValueChange={setIsFri}
            />
            <Text>Fri</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            
            <CheckBox
              value={isSat}
              onValueChange={setIsSat}
            />
            <Text>Sat</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            
            <CheckBox
              value={isSun}
              onValueChange={setIsSun}
            />
            <Text>Sun</Text>
            </View>
            </View>
    
          
          
    
    
         
        </View>
        )
    }

    

    return(
        <>
        
                
                <SafeAreaView style={{flex:1}}>
                  <ScrollView>
                
                <View style={{backgroundColor:'white',margin:20,padding:30,borderRadius:20,elevation:7,paddingBottom:25}}>
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
                <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#9E76B4',paddingLeft:15,borderRadius:20,elevation:7,marginLeft:5,marginTop:10}}>
                    <Text style={{fontSize:20,color:'white'}}>Year</Text>
                    <Picker
                        selectedValue={selectedYearValue}
                        style={{ height: 39, width: 110,color:'white'}}
                        onValueChange={(itemValue, itemIndex) => {setSelectedYearValue(itemValue)}}
                    >
                        <Picker.Item label="2560" value="2560"  />
                        <Picker.Item label="2561" value="2561" />
                        <Picker.Item label="2562" value="2562" />
                        <Picker.Item label="2563" value="2563" />
                        <Picker.Item label="2564" value="2564" />
                    </Picker>
                </View>
                </View>

                <Text style={styles.title}>Month period</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#9E76B4',paddingLeft:15,borderRadius:20,elevation:7}}>

                     <Picker
                        selectedValue={selectedMonthStart}
                        style={{ height: 40, width: 100,color:'white'}}
                        onValueChange={(itemValue, itemIndex) => {setSelectedMonthStart(itemValue)}}
                    >
                        <Picker.Item label="1" value="1"  />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3"  />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5"  />
                        <Picker.Item label="6" value="6" />
                        <Picker.Item label="7" value="7"  />
                        <Picker.Item label="8" value="8" />
                        <Picker.Item label="9" value="9"  />
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="11" value="11"  />
                        <Picker.Item label="12" value="12" />
                    </Picker>
                </View>
                <Text style={{fontSize:20,justifyContent:'center',alignSelf:'center',}}> to </Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#9E76B4',paddingLeft:15,borderRadius:20,elevation:7,marginLeft:5}}>
                    
                    <Picker
                        selectedValue={selectedMonthEnd}
                        style={{ height: 40, width: 100,color:'white'}}
                        onValueChange={(itemValue, itemIndex) => {setSelectedMonthEnd(itemValue)}}
                    >
                        <Picker.Item label="1" value="1"  />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3"  />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5"  />
                        <Picker.Item label="6" value="6" />
                        <Picker.Item label="7" value="7"  />
                        <Picker.Item label="8" value="8" />
                        <Picker.Item label="9" value="9"  />
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="11" value="11"  />
                        <Picker.Item label="12" value="12" />
                    </Picker>
                </View>
                </View>

                </View>
                    <Text style={styles.title}>Session ID</Text>
                    <TextInput placeholder='261434'/>
                    <Text style={styles.title}>Session Name</Text>
                    <TextInput placeholder='Network'/>
                    <Text style={styles.title}>Description</Text>
                    <TextInput placeholder='Room 516 CPE Building'/>
                    <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:25}}>
                        <View>
                            <Text style={styles.title}>Start time</Text>
                            
                            <TouchableOpacity onPress={_showTimepicker_start}  style={{backgroundColor:'#9E76B4',borderRadius:20,padding:7,elevation:10,alignItems:'center'}}>
                                <Text style={{color:'white'}}>{selectedTime_start}</Text>
                            </TouchableOpacity>
                            
                        </View>
                        <View>
                            <Text style={styles.title}>End time</Text>
                            <TouchableOpacity onPress={_showTimepicker_end}  style={{backgroundColor:'#9E76B4',borderRadius:20,padding:7,elevation:10,alignItems:'center'}}>
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
                            <Text style={styles.title}>Continue </Text>
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
                             onChange={onChange_start}
                        />
                    )}

                    {showTimePicker_end && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={time_end}
                             mode='time'
                            is24Hour={true}
                            display="default"
                             onChange={onChange_end}
                        />
                    )}
                
                
                
                </ScrollView>  
                </SafeAreaView>

        </>
            
        
        
        
        

    );

}



const styles = StyleSheet.create({
    title:{
        fontSize:20
    }
  });

export default TeacherSessionCreate