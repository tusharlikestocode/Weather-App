import React, { Component } from 'react'
import { StyleSheet, Text, View,TextInput,Button,Alert,Pressable } from 'react-native';


const S2 = ()=>(
  

    <View style={styles.layout}>
      <Text style={styles.title}>
        Current Temperature :{route.params.temp}°C {'\n'} 
        Humidity:{route.params.humidity}% {'\n'} 
        Wind Speed:{route.params.wmph}mph</Text>
     <Button
     title='Back'
     onPress={()=>{
        navigation.navigate('Screen1')
     }}/>
    </View>
  );
export default S2
const styles = StyleSheet.create({
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 32,
      marginBottom: 16,
      color:'black',
      textAlign:'center',
      justifyContent:'center',
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