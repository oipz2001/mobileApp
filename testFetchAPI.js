import React from 'react'
  import {
    View,
    Text,
    Button,
    TouchableOpacity,
    SafeAreaView,
  } from 'react-native';



  const TestAPI = () => {

    const  _fetchAPI = async () => {
        // await fetch('http://localhost:5000/studentchecking/us-central1/checkapp/mobileApp/testAPI')
        // .then((response) => response.text())
        // .then((json) => {
        // return json;
        // })
        // .catch((error) => {
        // console.error(error);
        // });

        console.log("Fetch API Function");
    }


    return(

        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={{backgroundColor:'red',padding:20,elevation:5,borderRadius:10}} onPress={_fetchAPI}>
                <Text style={{color:'white'}}>Fetch API</Text>
            </TouchableOpacity>
        </SafeAreaView>


    )
}

export default TestAPI