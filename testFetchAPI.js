import React,{useEffect,useState} from 'react'
  import {
    View,
    Text,
    Button,
    TouchableOpacity,
    SafeAreaView,
  } from 'react-native';
  

  const TestAPI = () => {

    const [data,setData] = useState(null)


    const  _fetchAPI = async () => {
        

        // await fetch('http://192.168.0.100:5000/studentchecking/us-central1/checkapp/mobileApp/test')
        // .then((response) => response.json())
        // .then((data) => {
        //     console.log(data);
        //     // setData(data)
        // })
        // .catch((error) => {
        //     console.error(error);
        // });
       
        await fetch('http://192.168.0.100:5000/studentchecking/us-central1/checkapp/mobileApp/test', {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstParam: 'yourValue',
            secondParam: 'yourOtherValue'
        })
        })
        .then((response) => response.json())
        .then((data) => {
            
            console.log(data);
            setData(data)
        })
        .catch((error) => {
        console.error(error);
        });
        
       

        
    }

    const test = async () => {
        console.log("Test");
        await fetch('http://192.168.0.100:5000/studentchecking/us-central1/checkapp/mobileApp/test')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // setData(data)
        })
        .catch((error) => {
            console.error(error);
        });
    }


    return(

        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={{backgroundColor:'red',padding:20,elevation:5,borderRadius:10}} onPress={_fetchAPI}>
                <Text style={{color:'white'}}>Fetch API</Text>
            </TouchableOpacity>
            
            <Text>{JSON.stringify( data)}</Text>
        </SafeAreaView>


    )
}

export default TestAPI