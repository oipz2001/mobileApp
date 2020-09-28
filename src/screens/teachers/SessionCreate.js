import React,{useState} from 'react'
import { Button, View,Text,StyleSheet } from 'react-native'
import Picker from '@react-native-community/picker'
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInput from '../../components/TextInput'
const TeacherSessionCreate = () => {
    const [selectedTermValue, setSelectedTermValue] = useState("1");

    return(
        <>
        
                
                <SafeAreaView style={{flex:1}}>
                <View style={{alignItems:'center',}}>
                    <Text style={{fontSize:30}}>Term</Text>
                </View>
                <View style={styles.container}>
      <Picker
        selectedValue={selectedTermValue}
        style={{ height: 100, width: 80}}
        onValueChange={(itemValue, itemIndex) => setSelectedTermValue(itemValue)}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
      </Picker>
    </View>
                
                </SafeAreaView>

        </>
            
        
        
        
        

    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      alignItems: "center",
    }
  });

export default TeacherSessionCreate