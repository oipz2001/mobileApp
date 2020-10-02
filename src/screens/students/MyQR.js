import React,{useState} from 'react'
import { Button, View,Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-generator';






const MyQR = () => {

    const [myTextQR,setMyTextQR] = useState('Parinya Seetawan 2542')

    return(
        <>
                <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <View style={{backgroundColor:'white',paddingLeft:30,paddingRight:30,paddingTop:70,paddingBottom:70,borderRadius:25,elevation:8}} >
                        <QRCode
                            value={myTextQR}
                            size={300}
                            bgColor='black'
                            fgColor='white'
                        />
                    </View>
                
                
                </SafeAreaView>

        </>
            
        
        
        
        

    );

}

export default MyQR