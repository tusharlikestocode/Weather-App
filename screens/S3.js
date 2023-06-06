import React, { useState } from 'react'
import { StyleSheet, Text, View,TextInput,Button,Alert,Pressable,ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import {store} from '../store/store'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setHum,setTemp,setWind } from '../store/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
const S3 = ({navigation})=>{
  // const [temp,setTemp]=useState('');
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('Temperature');
      if (value !== null) {
        // We have data!!
        console.log(value);
        setTemp(value);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  };

  const [color,setColor]=useState('')
  const dispatch = useDispatch();
  const { temperature } = useSelector((state) => state.reducer.message);
  const { humidity } = useSelector((state) => state.reducer.message);

  const { wind } = useSelector((state) => state.reducer.message);

  

  const handlePress = () => {
    // dispatch(setMessage(color));
    _retrieveData()
  };

return(
<View style={styles.layout}>
  <Text style={styles.title}>
    Current Temperature :{temperature}°C {'\n'} 
    Humidity:{humidity}% {'\n'} 
    Wind Speed:{wind}mph 
    </Text>
 <Button
 title='Back'
 onPress={()=>{
    navigation.navigate('Nimbus')
 }}/>
</View>
  
  
  );
}

export default S3
const styles = StyleSheet.create({
    layout: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      
      
    },
    title: {
      fontSize: 32,
      marginBottom: 16,
      color:'black',
      textAlign:'center',
      justifyContent:'center',
      margin:5
    },
    modal:{
      flex:1,
      justifyContent:'center',
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      
  
    },
    input:{
      width:250,
      borderColor:'black',
      borderWidth:1,
      padding:5,
      margin:5,
      textAlign:'center',
      color:'black'
      
    },
    closeButton:{
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor:'red',
      color:'white',
      width:100,
      textAlign:"center",
      fontSize:20
  
    }
  
  });