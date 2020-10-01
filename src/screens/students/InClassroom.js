import React,{useState} from 'react'
import { Button, View,Text,Image,StyleSheet } from 'react-native'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';





const InClassRoom = ({navigation}) => {

    return(
        <>
        
                <SafeAreaView style={{flex:1}}>
                {/* <View>
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
                </View> */}
                <View style={{marginTop:25}} >
                    <Text style={{alignSelf:'center',fontSize:25}} >Seat Map Creation</Text>
                
                    <View style={{flexDirection:'row',justifyContent:'space-around',padding:10}}>
                        
                        <TouchableOpacity style={styles.QR} onPress={() => navigation.navigate('ScanQR')}>
                            <Image source={require('../../assets/vectors/qr-code_scan.png')} style={{width:50,height:50}} />
                            <Text style={{marginTop:10}}>Scan QR</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.QR} onPress={() => navigation.navigate('MyQR')}>
                            <Image source={require('../../assets/vectors/qr-code.png')} style={{width:50,height:50}} />
                            <Text style={{marginTop:10}}>My QR</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>

                <View>
                    <Text style={{alignSelf:'center',fontSize:25}} >Session Report</Text>
                    <View style={{alignSelf:'center',marginTop:15}}>
                        <TouchableOpacity style={styles.QR} onPress={() => navigation.navigate('SessionReport')}>
                            <Image source={require('../../assets/vectors/report.png')} style={{width:50,height:50}} />
                            <Text style={{marginTop:10}}>Report</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </SafeAreaView>

        </>
            
        
        
        
        

    );

}


const styles = StyleSheet.create({
    QR:{
        backgroundColor:'white',
        padding:50,elevation:5,
        borderRadius:20,
        alignItems:'center',
        width:170,
        height:170
    },
    report:{
        backgroundColor:'white',
        padding:50,elevation:5,
        borderRadius:20,
        alignItems:'center'
    }
  });

export default InClassRoom