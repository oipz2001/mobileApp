import React,{useState} from 'react'
import { Button, View,Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';





const InClassRoom = ({navigation}) => {

    return(
        <>
        
                <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <View>
                    <Text style={{fontSize:20}}>Classroom Screen</Text>
                </View>
                <View style={{marginTop:30}}>
                <Button title="Go to ScanQR Screen"  onPress={() => navigation.navigate('ScanQR')}  />
                </View>
                <View style={{marginTop:30}}>
                <Button title="Go to MyQR Screen" onPress={() => navigation.navigate('MyQR')}  />
                </View>
                <View style={{marginTop:30}}>
                <Button title="Go to Report Screen" onPress={() => navigation.navigate('Report')}  />
                </View>
                </SafeAreaView>

        </>
            
        
        
        
        

    );

}

export default InClassRoom