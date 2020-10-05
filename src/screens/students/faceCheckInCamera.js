import React,{useState,useEffect} from 'react'
import { Button, View,Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Camera from '../cameraTest'





const FaceCheckIn = ({route}) => {
    useEffect(() => {
        console.log(route.params.sessionID + ' ' +route.params.sessionTitle + '(Check-in)');
    })

    return(
        
                
                
        <Camera  />

                
                

        
            
        
        
        
        

    );

}

export default FaceCheckIn