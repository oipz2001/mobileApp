import React,{useState} from 'react'
import { TextInput,View,StyleSheet } from 'react-native';

const Textinput = ({...propsTextInput}) => {
    return(
        // <View style={styles.container}>
        <TextInput style={styles.textInput} {...propsTextInput}  />
        // </View>
        
        
        

    );

}

const styles = StyleSheet.create({
    container :{
        flex:1,
        alignItems:'center',
        justifyContent:"center"
    },
    textInput:{
        borderColor: '#000000', 
        borderWidth: 0.2, 
        width:300 , 
        borderRadius:25,
        padding: 8,
        paddingLeft: 15,
        backgroundColor: "#dcdcdc",
        elevation:6
        
    }
  });

export default Textinput