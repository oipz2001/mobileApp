import React,{useEffect, useState} from 'react'
import { Button, View,Text,StyleSheet,FlatList,StatusBar,TouchableOpacity,Image,Modal,ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const TeacherSeatmap = ({route}) => {
    const [showSeatmapModal,setShowSeatmapModal] = useState(false)
    const [modalData,setModalData] = useState('')

    const seatmapArray = [
        ['A','B',  'C',   'D'    ],
        ['D' ,'E' ,'F' ,'G' ],
        ['H' ,'I' ,'J' ,'K' ],
        ['L' ,'M' ,'N' ,'O' ]
    ]

    const _pressSeatmap = (i,j) =>{
        console.log(seatmapArray[i][j]);
        setModalData(seatmapArray[i][j])
        setShowSeatmapModal(!showSeatmapModal)
    }

    useEffect(() => {
        console.log(route.params.sessionID + ' ' +route.params.sessionTitle + '(Seatmap)');
        console.log(route.params.uqID);
    },[])

    
    return(
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
             <Image
                style={{width:200,height:200}}
                source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/studentchecking.appspot.com/o/600610748?alt=media&token=bbbc7209-23f9-45cf-926d-036b46239941',
                }}
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={showSeatmapModal}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={{backgroundColor:'white',alignItems:'center',justifyContent:'center',flex:1,marginLeft:20,marginRight:20,marginTop:220,borderRadius:20,elevation:8,marginBottom:190}}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <TouchableOpacity  onPress={() => setShowSeatmapModal(!showSeatmapModal)}>
                            <Image source={require('../../assets/vectors/close.png')} style={{width:30,height:30}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:4,justifyContent:'center'}}>
                        <Text>{modalData}</Text> 
                    </View>
                    

                </View>
            </Modal>
            
            <View style={{backgroundColor:'white',elevation:8,borderRadius:25,width:350,height:350,padding:40,justifyContent:'space-between'}}>
            {
                seatmapArray.map((row,i) => (
                    <View style={{flexDirection:'row',justifyContent:'space-between'}} key={i}>
                        {row.map((column,j) => 
                            <TouchableOpacity key={j} onPress={() => _pressSeatmap(i,j)} style={{backgroundColor:'#9E76B4',width:50,height:50,borderRadius:10,justifyContent:'center',alignItems:'center',elevation:10}}>
                                <Text style={{color:'white'}}>{column}</Text>
                            </TouchableOpacity> 
                        )}
                    </View> 
                ))
            }
           

            
                
            </View>

           
            
           
        </SafeAreaView>
    )

}



export default TeacherSeatmap