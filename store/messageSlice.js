import { createSlice } from "@reduxjs/toolkit"
import React, {  useState   } from 'react';
import { AsyncStorage } from "@react-native-async-storage/async-storage";

// _retrieveData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('Temperature');
//       if (value !== null) {
//         // We have data!!
//         setTemp(value)
//       }
//     } catch (error) {
//       // Error retrieving data
//       console.log(error)
//     }
//   };

    
  
const messageSlice = createSlice({
  name: "message",
initialState: {
    temperature: 'hot',
    humidity:'hot',
    wind:'fast',
    location:'none',
    date:'none'
   
   
  },
  reducers: {
    setTemp(state, action) {
      state.temperature = action.payload
    },
    setHum(state, action) {
        state.humidity = action.payload
      },
      setWind(state, action) {
        state.wind = action.payload
      },
      setlocation(state,action){
        state.location=action.payload
      },
      setdate(state,action){
        state.date=action.payload
      }
    
   
  }
})

export const { setTemp,setHum,setWind,setlocation,setdate } = messageSlice.actions
export default messageSlice.reducer