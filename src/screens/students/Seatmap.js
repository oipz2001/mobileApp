import React,{useEffect, useState} from 'react'
import { Button, View,Text,Image,StyleSheet } from 'react-native'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';





const InClassRoom = ({route,navigation}) => {
    const classUqID = route.params.uqID
    const teacherID = route.params.teacherID 
    const date = route.params.date
    useEffect(() => {
        console.log(classUqID + ' ' +teacherID+ ' '+ date);

    })

    return(
        <>
        
                <SafeAreaView style={{flex:1}}>
                <View style={{marginTop:25}} >
                    <Text style={{alignSelf:'center',fontSize:20}} >การสร้างแผนผังที่นั่งห้องเรียน</Text>
                
                    <View style={{flexDirection:'row',justifyContent:'space-around',padding:10}}>
                        
                        <TouchableOpacity style={styles.QR} onPress={() => navigation.navigate('ScanQR',{uqID:classUqID,teacherID:teacherID,date:date})}>
                            <Image source={require('../../assets/vectors/qr-code_scan.png')} style={{width:50,height:50}} />
                            <Text style={{marginTop:10}}>สแกน QR</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.QR} onPress={() => navigation.navigate('MyQR',{sessionID:route.params.sessionID,sessionTitle:route.params.sessionTitle})}>
                            <Image source={require('../../assets/vectors/qr-code.png')} style={{width:50,height:50}} />
                            <Text style={{marginTop:10}}>QR ของฉัน</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>

                {/* <View>
                    <Text style={{alignSelf:'center',fontSize:25}} >Session Report</Text>
                    <View style={{alignSelf:'center',marginTop:15}}>
                        <TouchableOpacity style={styles.QR} onPress={() => navigation.navigate('SessionReport',{sessionID:route.params.sessionID,sessionTitle:route.params.sessionTitle})}>
                            <Image source={require('../../assets/vectors/report.png')} style={{width:50,height:50}} />
                            <Text style={{marginTop:10}}>Report</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
                </SafeAreaView>

        </>
            
        
        
        
        

    );

}


const styles = StyleSheet.create({
    QR:{
        backgroundColor:'white',
        padding:40,elevation:2,
        borderRadius:20,
        alignItems:'center',
        width:170,
        height:170
    },
    report:{
        backgroundColor:'white',
        padding:50,elevation:2,
        borderRadius:20,
        alignItems:'center'
    }
  });

export default InClassRoom